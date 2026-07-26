import { Star, ShieldCheck, Percent } from "lucide-react";
import { DiscoveryForm } from "./DiscoveryForm";

const TRUST = [
  { icon: Star, label: "⭐ 5,0 sur Google" },
  { icon: ShieldCheck, label: "Coach certifié" },
  { icon: Percent, label: "-50 % sur la 1ère séance" },
];

export const Forms = () => {
  return (
    <section id="decouverte" className="pt-4 pb-8 md:py-16 bg-background relative scroll-mt-16">
      <div className="container-px max-w-3xl mx-auto">
        <div className="text-center mb-5 md:mb-8">
          <h2 className="text-2xl sm:text-4xl font-black mb-2 leading-tight">
            <span className="text-gradient-accent">Réservez à 19,5 €</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            -50 % sur votre première séance EMS.
          </p>
        </div>

        <DiscoveryForm />

        <ul className="flex flex-wrap justify-center items-center gap-2 mt-4">
          {TRUST.map((t) => (
            <li
              key={t.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[11px] sm:text-sm font-semibold text-secondary-foreground"
            >
              <t.icon className="w-3.5 h-3.5 text-accent" />
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
