import { Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export const ContactInfo = () => {
  return (
    <section id="contact-info" className="py-24 md:py-28 bg-gradient-soft">
      <div className="container-px max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">Nous trouver</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 mb-5">
            Au cœur de <span className="text-gradient-accent">Fréjus Plage</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="reveal-left rounded-3xl overflow-hidden shadow-elevated min-h-[360px] border border-border">
            <iframe
              title="Localisation Espace Nutri-Forme Fréjus Plage"
              src={SITE.mapsEmbed}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="reveal-right space-y-4">
            <InfoRow icon={MapPin} title="Adresse">
              <p>{SITE.addressLine1}</p>
              <p>{SITE.addressLine2}</p>
              <p>{SITE.postalCode} {SITE.city}</p>
              <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold mt-2 inline-block hover:underline">
                Itinéraire →
              </a>
            </InfoRow>
            <InfoRow icon={Phone} title="Téléphone">
              <a href={`tel:${SITE.phoneIntl}`} className="text-lg font-semibold hover:text-accent">{SITE.phone}</a>
            </InfoRow>
            <InfoRow icon={MessageCircle} title="WhatsApp">
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-accent"
              >
                Discuter sur WhatsApp →
              </a>
            </InfoRow>
            <InfoRow icon={Clock} title="Horaires">
              <ul className="space-y-1">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoRow>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoRow = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl p-6 shadow-soft border border-border flex gap-4 hover:shadow-elevated transition-shadow">
    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-accent grid place-items-center shadow-glow">
      <Icon className="w-5 h-5 text-accent-foreground" />
    </div>
    <div className="flex-1 text-foreground/90">
      <h3 className="font-bold mb-1">{title}</h3>
      <div className="text-muted-foreground text-sm">{children}</div>
    </div>
  </div>
);