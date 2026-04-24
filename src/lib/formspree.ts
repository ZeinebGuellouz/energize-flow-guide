/**
 * Formspree integration for form submissions
 *
 * Setup options:
 *
 * Option 1: Using environment variables with Formspree Form IDs
 * - Go to https://formspree.io/ and create a new form
 * - Copy your form ID (e.g., "f_xxxxx")
 * - Set environment variables:
 *   - VITE_FORMSPREE_DISCOVERY_ID=f_xxxxx
 *   - VITE_FORMSPREE_REQUEST_ID=f_xxxxx
 *
 * Option 2: Using email directly (simpler, no pre-creation needed)
 * - Set environment variable:
 *   - VITE_FORM_EMAIL=your-email@domain.com
 * - Formspree will automatically create forms for this email
 */

export async function submitFormspreeForm(
  formId: string,
  data: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  // Support both format: "f_xxxxx" and direct email usage
  const endpoint = formId.startsWith("f_")
    ? `https://formspree.io/${formId}`
    : `https://formspree.io/f/${formId}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return {
      success: true,
      message: "Votre demande a été envoyée avec succès!",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
    };
  }
}
