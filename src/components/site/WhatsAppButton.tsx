import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const WhatsAppButton = () => {
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Bonjour, je souhaite des informations sur les séances EMS chez VitaFit Fréjus Plage."
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      onClick={() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "click_whatsapp",
        });
      }}
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      className="fixed right-4 sm:right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-glow animate-pulse-glow hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" />
    </a>
  );
};
