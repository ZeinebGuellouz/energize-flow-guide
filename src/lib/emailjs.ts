import emailjs from "emailjs-com";

/**
 * EmailJS integration for form submissions
 * 
 * Setup:
 * 1. Go to https://www.emailjs.com/ and sign up
 * 2. Add your email as a new email service
 * 3. Create an email template (with variables matching form fields)
 * 4. Get your Service ID, Template IDs, and Public Key
 * 5. Set environment variables:
 *    - VITE_EMAILJS_SERVICE_ID=service_xxxxx
 *    - VITE_EMAILJS_TEMPLATE_DISCOVERY=template_xxxxx
 *    - VITE_EMAILJS_TEMPLATE_REQUEST=template_xxxxx
 *    - VITE_EMAILJS_PUBLIC_KEY=xxxxx
 */

let initialized = false;

export function initEmailJS() {
  if (initialized) return;
  
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!publicKey) {
    console.warn("EmailJS public key not configured");
    return;
  }
  
  emailjs.init(publicKey);
  initialized = true;
}

export async function submitDiscoveryForm(
  data: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  initEmailJS();
  
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_DISCOVERY;
  
  if (!serviceId || !templateId) {
    return {
      success: false,
      message: "Configuration EmailJS manquante. Vérifiez les variables d'environnement.",
    };
  }

  try {
    const response = await emailjs.send(serviceId, templateId, {
      ...data,
      to_email: "zeineb.guellouz@medtech.tn",
    });

    if (response.status !== 200) {
      throw new Error("Failed to send email");
    }

    return {
      success: true,
      message: "Votre demande a été envoyée avec succès!",
    };
  } catch (error) {
    console.error("Email submission error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
    };
  }
}

export async function submitRequestForm(
  data: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  initEmailJS();
  
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_REQUEST;
  
  if (!serviceId || !templateId) {
    return {
      success: false,
      message: "Configuration EmailJS manquante. Vérifiez les variables d'environnement.",
    };
  }

  try {
    const response = await emailjs.send(serviceId, templateId, {
      ...data,
      to_email: "zeineb.guellouz@medtech.tn",
    });

    if (response.status !== 200) {
      throw new Error("Failed to send email");
    }

    return {
      success: true,
      message: "Votre demande a été envoyée avec succès!",
    };
  } catch (error) {
    console.error("Email submission error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
    };
  }
}
