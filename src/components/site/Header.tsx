import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (item: (typeof NAV)[0]) => {
    setMenuOpen(false);

    if (pathname === item.to && item.hash) {
      scrollToId(item.hash);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled || menuOpen
          ? "bg-background/90 backdrop-blur-xl shadow-soft border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container-px max-w-7xl mx-auto flex items-center justify-between gap-3 h-16 md:h-20">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Accueil VitaFit Fréjus Plage"
        >
          <img
            src={logo}
            alt="VitaFit Fréjus Plage — EMS, Nutrition, Coaching"
            className="w-14 h-14 md:w-14 md:h-14 rounded-full bg-white object-contain p-0.5 shadow-glow group-hover:scale-105 transition-transform"
          />

          <div className="leading-tight block">
            <div className="font-extrabold text-sm md:text-lg tracking-tight text-foreground">
              VitaFit
            </div>
            <div className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-widest">
              EMS · Nutrition · Coaching
            </div>
          </div>
        </Link>

        <nav
          className="hidden md:flex flex-1 items-center justify-center gap-1"
          aria-label="Navigation principale"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                pathname === item.to
                  ? "text-accent bg-secondary"
                  : "text-foreground/80 hover:text-accent hover:bg-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${SITE.phoneIntl}`}
            aria-label={`Appeler ${SITE.phone}`}
            className="text-sm font-semibold text-foreground/80 hover:text-accent items-center gap-2 transition-colors flex"
          >
            <Phone className="w-4 h-4" />
            {SITE.phone}
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <a
            href={`tel:${SITE.phoneIntl}`}
            aria-label="Appeler"
            className="w-10 h-10 rounded-full bg-secondary text-foreground hover:text-accent grid place-items-center transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="w-10 h-10 rounded-full bg-secondary text-foreground hover:text-accent grid place-items-center transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/60 shadow-soft">
          <nav
            className="container-px max-w-7xl mx-auto py-4 flex flex-col gap-2"
            aria-label="Navigation mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "px-4 py-3 rounded-2xl text-sm font-semibold transition-all",
                  pathname === item.to
                    ? "text-accent bg-secondary"
                    : "text-foreground/80 hover:text-accent hover:bg-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
