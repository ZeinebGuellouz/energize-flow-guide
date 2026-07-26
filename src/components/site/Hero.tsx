import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/site";
import heroImg from "@/assets/hero-ems.jpg";

export const Hero = () => {
  return (
    <section className="relative flex items-center overflow-hidden -mt-14 pt-14 md:-mt-20 md:min-h-[92svh] md:pt-20">
      {/* Original background image and overlays */}
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

      <div className="container-px relative z-10 mx-auto max-w-7xl py-8 sm:py-12 md:py-24">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-[1.75rem] font-black leading-[1.08] text-foreground sm:mb-8 sm:text-5xl md:text-6xl">
            Salle de sport EMS{" "}
            <span className="text-gradient-accent">à Fréjus Plage</span>
          </h1>

          {/* Two compact, equal-width buttons */}
          <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4">
            <Button
              variant="hero"
              size="lg"
              className="
                h-12 w-full px-3
                text-xs font-bold
                whitespace-nowrap
                sm:h-14 sm:px-5 sm:text-base
              "
              onClick={() => scrollToId("decouverte")}
            >
              Profiter de -50 %
            </Button>

            <Button
              variant="outlineHero"
              size="lg"
              className="
                h-12 w-full px-3
                text-xs font-semibold
                whitespace-nowrap
                sm:h-14 sm:px-5 sm:text-base
              "
              onClick={() => scrollToId("benefices")}
            >
              Découvrir l&apos;EMS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
