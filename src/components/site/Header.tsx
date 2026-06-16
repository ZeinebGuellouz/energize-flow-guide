import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { SITE, scrollToId } from "@/lib/site";
import { cn } from "@/lib/utils";

const logo =
  "/ChatGPT_Image_12_juin_2026__08_13_47-removebg-preview.png";

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
        "fixed top-0 inset-x-0 z-50 w-full max-w-[100vw] overflow-hidden transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-soft border-b border-border/60"
          : "bg-background/90 backdrop-blur-md"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-1.5 sm:px-4 md:px-6 flex items-center gap-1 h-16 md:h-20 overflow-hidden">
        <Link
          to="/"
          className="flex items-center gap-1.5 shrink-0"
          aria-label="Accueil VitaFit Fréjus Plage"
        >
          <img
            src={logo}
            alt="VitaFit Fréjus Plage"
            width={40}
            height={40}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white object-contain p-0.5 shadow-glow shrink-0"
          />
        </Link>

        <nav
          className="min-w-0 flex-1 flex items-center justify-start md:justify-center gap-0.5 overflow-x-hidden"
          aria-label="Navigation principale"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item)}
              className={cn(
                "px-2 py-2 md:px-4 md:py-2 rounded-full text-[9px] sm:text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300",
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
          className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-auto md:h-auto rounded-full md:rounded-none bg-secondary md:bg-transparent text-foreground/80 hover:text-accent grid md:flex place-items-center md:items-center md:gap-2 transition-colors"
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

export default Header;
