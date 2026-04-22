import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/site";
import heroImg from "@/assets/hero-ems.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden -mt-16 md:-mt-20 pt-16 md:pt-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Femme en séance EMS d'électrostimulation"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="container-px max-w-7xl mx-auto relative z-10 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border text-foreground text-xs md:text-sm font-medium mb-6 animate-fade-in shadow-soft">
            <Sparkles className="w-4 h-4 text-accent" />
            Studio EMS premium · Fréjus Plage
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-foreground leading-[1.05] mb-6 animate-slide-up">
            Stimule{" "}
            <span className="text-gradient-accent">350 muscles</span>
            <br />
            en seulement <span className="text-gradient-accent">20 min</span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl animate-slide-up font-light" style={{ animationDelay: "120ms" }}>
            Nouvelle génération d'<strong className="font-semibold text-foreground">électrostimulation</strong>.
            Performance, silhouette et bien-être réunis dans une expérience unique.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "240ms" }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToId("decouverte")}
              className="group"
            >
              <Zap className="w-5 h-5" />
              Séance découverte offerte
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outlineHero"
              size="xl"
              onClick={() => scrollToId("benefices")}
            >
              Découvrir l'EMS
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-14 max-w-xl animate-fade-in" style={{ animationDelay: "400ms" }}>
            {[
              { v: "20", l: "minutes" },
              { v: "350", l: "muscles" },
              { v: "1×", l: "/ semaine" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-4">
                <div className="text-2xl md:text-4xl font-black text-foreground">{s.v}</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{s.l}</div>
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