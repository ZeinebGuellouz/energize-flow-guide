import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-primary-foreground pt-16 pb-8">
      <div className="container-px max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent grid place-items-center font-black shadow-glow">
              N
            </div>
            <div>
              <div className="font-bold">Nutri-Forme</div>
              <div className="text-xs text-primary-foreground/60 uppercase tracking-widest">
                Fréjus Plage
              </div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Studio EMS premium et coaching nutrition Herbalife à Fréjus Plage.
            Une approche complète, humaine et performante.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {[
              { l: "Accueil", to: "/" },
              { l: "À propos", to: "/a-propos" },
              { l: "Services EMS", to: "/services-ems" },
              { l: "Produits Herbalife", to: "/herbalife" },
              { l: "Tarifs", to: "/tarifs" },
              { l: "Contact", to: "/contact" },
            ].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="text-primary-foreground/70 hover:text-accent transition-colors">
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <span>{SITE.addressLine1}<br />{SITE.addressLine2}<br />{SITE.postalCode} {SITE.city}</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-accent" />
              <a href={`tel:${SITE.phoneIntl}`} className="hover:text-accent">{SITE.phone}</a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-accent" />
              <a href="mailto:contact@nutri-forme-frejus.fr" className="hover:text-accent">contact@nutri-forme-frejus.fr</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Horaires</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {SITE.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-2">
                <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-accent" />{h.day}</span>
                <span className="font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-px max-w-7xl mx-auto mt-12 pt-6 border-t border-primary-foreground/10 text-xs text-primary-foreground/50 flex flex-col md:flex-row gap-2 md:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
        <p>Mentions légales · Politique de confidentialité</p>
      </div>
    </footer>
  );
};