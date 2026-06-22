import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/site";
import heroImg from "@/assets/hero-ems.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden -mt-14 md:-mt-20 pt-16 md:pt-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Salle de sport EMS à Fréjus Plage avec séance d'électrostimulation"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30 md:via-background/85 md:to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10 md:via-transparent md:to-background/30" />
      </div>

      <div className="container-px max-w-7xl mx-auto relative z-10 py-14 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border text-foreground text-[11px] sm:text-xs md:text-sm font-medium mb-5 md:mb-6 animate-fade-in shadow-soft">
            <Sparkles className="w-4 h-4 text-accent" />
            VitaFit EMS Fréjus · Salle de sport premium
          </div>

          <h1 className="text-[2rem] leading-[1.05] sm:text-5xl md:text-7xl font-black text-foreground mb-5 md:mb-6 animate-slide-up">
            Votre salle de sport
            <br />
            <span className="text-gradient-accent">
              EMS à Fréjus Plage
            </span>
          </h1>

          <p
            className="text-sm sm:text-lg md:text-2xl text-muted-foreground mb-6 md:mb-10 max-w-2xl animate-slide-up font-light"
            style={{ animationDelay: "120ms" }}
          >
            Salle de sport spécialisée en
            <strong className="font-semibold text-foreground">
              {" "}électrostimulation EMS
            </strong>
            , coaching personnalisé et nutrition. Perte de poids, tonification
            et bien-être dans une expérience premium.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              variant="hero"
              size="lg"
              className="sm:h-14 sm:text-base sm:px-8"
              onClick={() => scrollToId("decouverte")}
            >
              <Zap className="w-5 h-5" />
              -50% sur la première séance
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outlineHero"
              size="lg"
              className="sm:h-14 sm:text-base sm:px-8"
              onClick={() => scrollToId("benefices")}
            >
              Découvrir l'EMS
            </Button>
          </div>

          <div
            className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 md:mt-14 max-w-xl animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            {[
              { v: "20", l: "minutes" },
              { v: "350", l: "muscles" },
              { v: "1×", l: "/ semaine" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-3 sm:pl-4">
                <div className="text-xl sm:text-2xl md:text-4xl font-black text-foreground">
                  {s.v}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground animate-float">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-accent/60" />
      </div>
    </section>
  );
};
