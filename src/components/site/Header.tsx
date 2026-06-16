import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { SITE, scrollToId } from "@/lib/site";
import { cn } from "@/lib/utils";

const logo = "/ChatGPT_Image_12_juin_2026__08_13_47-removebg-preview.png";

const NAV = [
  { label: "Accueil", to: "/", hash: "top" },
  { label: "À propos", to: "/a-propos" },
  { label: "Nutrition", to: "/nutrition" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Contact", to: "/contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (item: (typeof NAV)[0]) => {
    if (pathname === item.to && item.hash) {
      scrollToId(item.hash);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-soft border-b border-border/60"
          : "bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="container-px max-w-7xl mx-auto flex items-center gap-2 h-[68px] md:h-20">
        <Link
          to="/"
          className="flex items-center gap-2 group shrink-0"
          aria-label="Accueil VitaFit Fréjus Plage"
        >
          <img
            src={logo}
            alt="VitaFit Fréjus Plage — EMS, Nutrition, Coaching"
            className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-white object-contain p-0.5 shadow-glow group-hover:scale-105 transition-transform"
          />

          <div className="leading-tight hidden sm:block">
            <div className="font-extrabold text-sm md:text-lg tracking-tight text-foreground">
              VitaFit
            </div>
            <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-widest">
              EMS · Nutrition
            </div>
          </div>
        </Link>

        <nav
          className="flex-1 flex items-center justify-center gap-0.5 overflow-x-auto no-scrollbar"
          aria-label="Navigation principale"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item)}
              className={cn(
                "px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300",
                pathname === item.to
                  ? "text-accent bg-secondary"
                  : "text-foreground/80 hover:text-accent hover:bg-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${SITE.phoneIntl}`}
          aria-label={`Appeler ${SITE.phone}`}
          className="shrink-0 w-9 h-9 md:w-auto md:h-auto md:px-0 rounded-full md:rounded-none bg-secondary md:bg-transparent text-foreground/80 hover:text-accent grid md:flex place-items-center md:items-center md:gap-2 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden lg:inline text-sm font-semibold">
            {SITE.phone}
          </span>
        </a>
      </div>
    </header>
  );
};
