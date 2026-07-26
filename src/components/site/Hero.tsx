import { ArrowRight, Star, ShieldCheck, Percent, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/site";
import heroImg from "@/assets/hero-ems.jpg";

const TRUST = [
  { icon: Star, label: "5,0 Google" },
  { icon: ShieldCheck, label: "Coach certifié" },
  { icon: Percent, label: "-50 % 1ère séance" },
];

export const Hero = () => {
  return (
    <section className="relative flex items-center overflow-hidden -mt-14 md:-mt-20 pt-14 md:pt-20 md:min-h-[92svh]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Salle de sport EMS à Fréjus Plage avec séance d'électrostimulation"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40 md:via-background/85 md:to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 md:via-transparent md:to-background/30" />
      </div>

      <div className="container-px max-w-7xl mx-auto relative z-10 py-6 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-[1.75rem] leading-[1.1] sm:text-5xl md:text-6xl font-black text-foreground mb-3 md:mb-5">
            Salle de sport EMS <span className="text-gradient-accent">à Fréjus Plage</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-4 md:mb-8 max-w-xl">
            20 minutes, 350 muscles, un coach pour vous. Perte de poids, tonification et remise en forme.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
            <Button
              variant="hero"
              size="lg"
              className="w-full sm:w-auto h-auto py-3 text-sm leading-snug sm:h-14 sm:py-0 sm:text-base sm:px-8 whitespace-normal"
              onClick={() => scrollToId("decouverte")}
            >
              <Zap className="w-5 h-5 flex-shrink-0" />
              <span>Réserver ma séance à 19 € (-50 % sur la première séance)</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outlineHero"
              size="lg"
              className="hidden sm:inline-flex sm:h-14 sm:text-base sm:px-8"
              onClick={() => scrollToId("benefices")}
            >
              Découvrir l'EMS
            </Button>
          </div>

          {/* Trust signals directly below the CTA */}
          <ul className="flex flex-nowrap items-center justify-start gap-2 mt-4 md:mt-6">
            {TRUST.map((t) => (
              <li
                key={t.label}
                className="inline-flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-md border border-border px-2 py-1 text-[10px] sm:text-sm font-semibold text-foreground shadow-soft whitespace-nowrap"
              >
                <t.icon className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
