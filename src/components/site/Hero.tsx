import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/site";
import heroImg from "@/assets/hero-ems.jpg";

const STATS = [
  { value: "25", label: "minutes" },
  { value: "350", label: "muscles" },
  { value: "1×", label: "/ semaine" },
];

export const Hero = () => {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden -mt-14 pt-16 md:-mt-20 md:pt-20">
      {/* Original background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Salle de sport EMS à Fréjus Plage avec séance d'électrostimulation"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
          fetchPriority="high"
        />

        {/* Original-style overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30 md:via-background/85 md:to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10 md:via-transparent md:to-background/30" />
      </div>

      <div className="container-px relative z-10 mx-auto max-w-7xl py-14 md:py-28">
        <div className="max-w-3xl">
          {/* Premium badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 text-[11px] font-medium text-foreground shadow-soft backdrop-blur-md sm:px-4 sm:text-xs md:mb-6 md:text-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            VitaFit EMS Fréjus · Salle de sport premium
          </div>

          {/* Old-style headline */}
          <h1 className="mb-5 text-[2rem] font-black leading-[1.05] text-foreground sm:text-5xl md:mb-6 md:text-7xl">
            Salle de sport
            <br />
            <span className="text-gradient-accent">à Fréjus Plage</span>
          </h1>

          {/* Original descriptive message */}
          <p className="mb-6 max-w-2xl text-sm font-light text-muted-foreground sm:text-lg md:mb-10 md:text-2xl">
            Salle de sport spécialisée en{" "}
            <strong className="font-semibold text-foreground">
              électrostimulation EMS
            </strong>
            , coaching personnalisé et nutrition. Perte de poids, tonification
            et bien-être dans une expérience premium.
          </p>

          {/* Two compact buttons, always visible */}
          <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4">
            <Button
              variant="hero"
              size="lg"
              className="h-12 w-full px-3 text-xs font-bold whitespace-nowrap sm:h-14 sm:px-5 sm:text-base"
              onClick={() => scrollToId("decouverte")}
            >
              Profiter de -50 %
            </Button>

            <Button
              variant="outlineHero"
              size="lg"
              className="h-12 w-full px-3 text-xs font-semibold whitespace-nowrap sm:h-14 sm:px-5 sm:text-base"
              onClick={() => scrollToId("benefices")}
            >
              Découvrir l&apos;EMS
            </Button>
          </div>

          {/* Original statistics */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-6 md:mt-14">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-accent pl-3 sm:pl-4"
              >
                <div className="text-xl font-black text-foreground sm:text-2xl md:text-4xl">
                  {stat.value}
                </div>

                <div className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Original desktop scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-10 w-px bg-accent/60" />
      </div>
    </section>
  );
};
