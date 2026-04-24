import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, scrollToId } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Accueil", to: "/", hash: "top" },
  { label: "À propos", to: "/a-propos" },
  { label: "Services EMS", to: "/services-ems" },
  { label: "Herbalife", to: "/herbalife" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Contact", to: "/contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (item: typeof NAV[0]) => {
    if (pathname === item.to && item.hash) {
      scrollToId(item.hash);
    }
  };

  const handleCta = () => {
    if (pathname === "/") scrollToId("decouverte");
    else navigate("/contact");
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-soft border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container-px max-w-7xl mx-auto flex items-center justify-between gap-2 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-accent grid place-items-center font-black text-accent-foreground shadow-glow group-hover:scale-105 transition-transform">
            N
          </div>
          <div className="leading-tight hidden sm:block">
            <div className={cn("font-bold text-sm md:text-base", scrolled ? "text-foreground" : "text-foreground")}>
              Nutri-Forme
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
              Fréjus Plage
            </div>
          </div>
        </Link>

        <nav
          className="flex-1 flex items-center justify-center gap-0.5 md:gap-1 overflow-x-auto no-scrollbar"
          aria-label="Navigation principale"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item)}
              className={cn(
                "px-2.5 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300",
                pathname === item.to
                  ? "text-accent bg-secondary"
                  : "text-foreground/80 hover:text-accent hover:bg-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <a
            href={`tel:${SITE.phoneIntl}`}
            aria-label={`Appeler ${SITE.phone}`}
            className="hidden md:flex text-sm font-semibold text-foreground/80 hover:text-accent items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {SITE.phone}
          </a>
          <a
            href={`tel:${SITE.phoneIntl}`}
            aria-label="Appeler"
            className="md:hidden p-2 rounded-full text-foreground hover:bg-secondary hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          <Button
            variant="hero"
            size="sm"
            onClick={handleCta}
            className="text-xs sm:text-sm"
          >
            Séance offerte
          </Button>
        </div>
      </div>
    </header>
  );
};
