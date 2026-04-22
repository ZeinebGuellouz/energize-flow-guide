import { DiscoveryForm } from "./DiscoveryForm";
import { EmsRequestForm } from "./EmsRequestForm";

export const Forms = () => {
  return (
    <section id="decouverte" className="py-24 md:py-32 bg-background relative scroll-mt-20">
      <div className="container-px max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">Réservez maintenant</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 mb-5">
            <span className="text-gradient-accent">Deux options</span> pour démarrer
          </h2>
          <p className="text-lg text-muted-foreground">
            Profitez de votre séance découverte offerte à 2, ou demandez directement vos séances EMS personnalisées.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="reveal-left"><DiscoveryForm /></div>
          <div id="ems-request" className="reveal-right scroll-mt-20"><EmsRequestForm /></div>
        </div>
      </div>
    </section>
  );
};