import { DiscoveryForm } from "./DiscoveryForm";

export const Forms = () => {
  return (
    <section id="decouverte" className="py-20 md:py-32 bg-background relative scroll-mt-20">
      <div className="container-px max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">
            Réserver ma séance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 md:mb-5 leading-tight">
            <span className="text-gradient-accent">Séance découverte</span> offerte à 2
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Venez tester l'EMS avec un·e ami·e. Sans engagement, on s'occupe du reste.
          </p>
        </div>

        <div className="reveal">
          <DiscoveryForm />
        </div>
      </div>
    </section>
  );
};