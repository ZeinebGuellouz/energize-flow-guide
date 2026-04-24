import { Link } from "react-router-dom";
import { SITE } from "@/lib/site";

const NAV = [
  { l: "Accueil", to: "/" },
  { l: "À propos", to: "/a-propos" },
  { l: "Services EMS", to: "/services-ems" },
  { l: "Herbalife", to: "/herbalife" },
  { l: "Tarifs", to: "/tarifs" },
  { l: "Contact", to: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-primary-foreground py-8 md:py-10">
      <div className="container-px max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-accent grid place-items-center font-black shadow-glow">
            N
          </div>
          <div className="leading-tight">
            <div className="font-bold text-sm">Nutri-Forme</div>
            <div className="text-[10px] text-primary-foreground/60 uppercase tracking-widest">
              Fréjus Plage
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {NAV.map((i) => (
            <Link key={i.to} to={i.to} className="text-primary-foreground/70 hover:text-accent transition-colors">
              {i.l}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container-px max-w-6xl mx-auto mt-6 pt-4 border-t border-primary-foreground/10 text-xs text-primary-foreground/50 flex flex-col sm:flex-row gap-1 sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
        <p>Mentions légales · Confidentialité</p>
      </div>
    </footer>
  );
};