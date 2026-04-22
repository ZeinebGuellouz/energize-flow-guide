import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export const WhatsAppButton = () => {
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Bonjour, je souhaite des informations sur les séances EMS chez Espace Nutri-Forme Fréjus Plage."
  )}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-glow animate-pulse-glow hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </a>
  );
};