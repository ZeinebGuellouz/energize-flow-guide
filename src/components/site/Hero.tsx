import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/site";
import heroImg from "@/assets/hero-ems.jpg";

const TRUST = [
  { icon: Star, label: "5,0 Google" },
  { icon: ShieldCheck, label: "Coach certifié" },
];

export const Hero = () => {
  return (
    <section className="relative flex items-center overflow-hidden -mt-14 pt-14 md:-mt-20 md:min-h-[92svh] md:pt-20">
      {/* Keep the original background image and overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Salle de sport EMS à Fréjus Plage avec séance d'électrostimulation"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40 md:via-background/85 md:to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 md:via-transparent md:to-background/30" />
      </div>

      <div className="container-px relative z-10 mx-auto max-w-7xl py-7 sm:py-10 md:py-24">
        <div className="max-w-3xl">
          <h1 className="mb-3 text-[1.75rem] font-black leading-[1.08] text-foreground sm:mb-4 sm:text-5xl md:mb-5 md:text-6xl">
            Salle de sport EMS{" "}
            <span className="text-gradient-accent">à Fréjus Plage</span>
          </h1>

          <p className="mb-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mb-7 sm:text-lg md:mb-8 md:text-xl">
            20 minutes. 350 muscles activés. Votre coach personnel.
          </p>

          {/* Both buttons remain visible on mobile and desktop */}
         <div className="grid grid-cols-2 gap-3 mt-2 max-w-xl">
  <Button
    variant="hero"
    size="lg"
    className="
      group
      h-12 md:h-14
      w-full
      px-4
      text-sm md:text-base
      font-semibold
      whitespace-nowrap
    "
    onClick={() => scrollToId("decouverte")}
  >
    <Zap className="w-4 h-4 mr-2 shrink-0" />
    <span>Profiter de -50 %</span>
    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Button>

  <Button
    variant="outlineHero"
    size="lg"
    className="
      h-12 md:h-14
      w-full
      px-4
      text-sm md:text-base
      font-semibold
      whitespace-nowrap
    "
    onClick={() => scrollToId("benefices")}
  >
    Découvrir l'EMS
  </Button>
</div>

          {/* Compact trust badges */}
          <ul className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:flex-nowrap">
            {TRUST.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.label}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full border border-border
                    bg-card/80 px-3 py-1.5
                    text-[11px] font-semibold text-foreground
                    shadow-soft backdrop-blur-md
                    whitespace-nowrap
                    sm:text-sm
                  "
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
