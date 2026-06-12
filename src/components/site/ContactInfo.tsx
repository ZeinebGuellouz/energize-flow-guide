import { MapPin, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export const ContactInfo = () => {
  return (
    <section id="contact-info" className="py-12 md:py-20 bg-gradient-soft">
      <div className="container-px max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8 reveal">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
            Nous trouver à <span className="text-gradient-accent">Fréjus Plage</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch reveal">
          <div className="rounded-2xl overflow-hidden shadow-elevated border border-border min-h-[220px] md:min-h-[260px] order-2 md:order-1">
            <iframe
              title="Localisation VitaFit Fréjus Plage"
              src={SITE.mapsEmbed}
              className="w-full h-full min-h-[220px] md:min-h-[260px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="bg-card rounded-2xl p-5 md:p-6 shadow-soft border border-border flex flex-col gap-3 order-1 md:order-2 text-sm">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{SITE.addressLine1}</p>
                <p className="text-muted-foreground">{SITE.postalCode} {SITE.city}</p>
                <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                  Itinéraire →
                </a>
              </div>
            </div>
            <a href={`tel:${SITE.phoneIntl}`} className="flex gap-3 items-center hover:text-accent">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <span className="font-semibold">{SITE.phone}</span>
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-center hover:text-accent"
            >
              <MessageCircle className="w-5 h-5 text-accent shrink-0" />
              <span className="font-semibold">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};