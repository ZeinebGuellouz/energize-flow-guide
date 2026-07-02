import { Link } from "react-router-dom";
import { SITE } from "@/lib/site";
const logo = "/ChatGPT_Image_12_juin_2026__08_13_47-removebg-preview.png";

const NAV = [
  { l: "Accueil", to: "/" },
  { l: "À propos", to: "/a-propos" },
  { l: "Nutrition", to: "/nutrition" },
  { l: "Tarifs", to: "/tarifs" },
  { l: "Blog", to: "/blog" },
  { l: "Contact", to: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-primary-foreground py-8 md:py-10">
      <div className="container-px max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-3.5">
          <img
            src={logo}
            alt="VitaFit Fréjus Plage"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white object-contain p-0.5 shadow-glow"
          />
          <div className="leading-tight">
            <div className="font-extrabold text-base md:text-lg tracking-tight">VitaFit</div>
            <div className="text-[10px] md:text-xs text-primary-foreground/60 uppercase tracking-widest">
              EMS · Nutrition · Coaching
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