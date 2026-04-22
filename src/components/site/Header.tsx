import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
      <div className="container-px max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-accent grid place-items-center font-black text-accent-foreground shadow-glow group-hover:scale-105 transition-transform">
            N
          </div>
          <div className="leading-tight">
            <div className={cn("font-bold text-sm md:text-base", scrolled ? "text-foreground" : "text-foreground")}>
              Nutri-Forme
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
              Fréjus Plage
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                pathname === item.to
                  ? "text-accent"
                  : "text-foreground/80 hover:text-accent hover:bg-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${SITE.phoneIntl}`}
            className="text-sm font-semibold text-foreground/80 hover:text-accent flex items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {SITE.phone}
          </a>
          <Button variant="hero" size="sm" onClick={handleCta}>
            Séance offerte
          </Button>
        </div>

        <button
          aria-label="Ouvrir le menu"
          className="lg:hidden p-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 bg-background/95 backdrop-blur-xl border-t border-border",
          open ? "max-h-[480px]" : "max-h-0"
        )}
      >
        <div className="container-px max-w-7xl mx-auto py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                pathname === item.to
                  ? "bg-secondary text-accent"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="px-4 py-3 rounded-xl text-base font-semibold text-foreground flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
            <Button variant="hero" onClick={handleCta} className="w-full">
              Réserver ma séance offerte
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};