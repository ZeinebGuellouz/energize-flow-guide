import emailjs from "emailjs-com";
import { saveInscription } from "./inscriptions";

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

const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "A_saBge9m4guGhBzY";
const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_939q9nc";
const TEMPLATE_DISCOVERY =
  import.meta.env.VITE_EMAILJS_TEMPLATE_DISCOVERY || "template_m0a3u1u";
const TEMPLATE_REQUEST =
  import.meta.env.VITE_EMAILJS_TEMPLATE_REQUEST || "template_tl2582e";
const TEMPLATE_CONFIRMATION =
  import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION || "";

/**
 * Sends an automatic confirmation email to the client after their request.
 * Uses the EmailJS template VITE_EMAILJS_TEMPLATE_CONFIRMATION with variables:
 * {{prenom}}, {{date}}, {{creneau}}, {{to_email}}.
 * Never blocks or fails the main submission: errors are only logged.
 */
async function sendClientConfirmation(data: Record<string, any>) {
  if (!TEMPLATE_CONFIRMATION || !data?.email) return;
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_CONFIRMATION, {
      to_email: data.email,
      prenom: data.prenom || "",
      date: data.date || data.dateSouhaitee || "",
      creneau: data.creneau || "",
    });
  } catch (error) {
    console.error("Client confirmation email error:", error);
  }
}

let initialized = false;

export function initEmailJS() {
  if (initialized) return;
  if (!PUBLIC_KEY) {
    console.warn("EmailJS public key not configured");
    return;
  }
  emailjs.init(PUBLIC_KEY);
  initialized = true;
}

export async function submitDiscoveryForm(
  data: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  initEmailJS();
  void saveInscription("decouverte", data);

  const serviceId = SERVICE_ID;
  const templateId = TEMPLATE_DISCOVERY;

  if (!serviceId || !templateId) {
    return {
      success: false,
      message: "Configuration EmailJS manquante.",
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

    await sendClientConfirmation(data);

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
  void saveInscription("demande_ems", data);
  
  const serviceId = SERVICE_ID;
  const templateId = TEMPLATE_REQUEST;

  if (!serviceId || !templateId) {
    return {
      success: false,
      message: "Configuration EmailJS manquante.",
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
