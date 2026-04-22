import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE, scrollToId } from "@/lib/site";

export const CTABand = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,white,transparent_60%)]" />
      <div className="container-px max-w-6xl mx-auto relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div className="reveal-left text-accent-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-2">Prêt·e à vivre votre 1ère séance EMS ?</h2>
          <p className="text-accent-foreground/90 text-lg">
            Séance découverte <strong>offerte</strong> pour vous et un·e ami·e. Sans engagement.
          </p>
        </div>
        <div className="reveal-right flex flex-col sm:flex-row gap-3">
          <Link to="/" onClick={() => setTimeout(() => scrollToId("decouverte"), 50)}>
            <Button variant="dark" size="xl" className="w-full sm:w-auto">
              Réserver maintenant
            </Button>
          </Link>
          <a href={`tel:${SITE.phoneIntl}`}>
            <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-accent">
              <Phone className="w-5 h-5" /> {SITE.phone}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};