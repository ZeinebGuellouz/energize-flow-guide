import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { CTABand } from "@/components/site/CTABand";
import { Forms } from "@/components/site/Forms";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Découverte",
    price: "Offerte",
    note: "Pour vous + 1 ami·e",
    features: ["Bilan personnalisé", "1 séance EMS de 20 min", "Combinaison fournie", "Sans engagement"],
    cta: "Réserver ma séance",
    highlight: false,
  },
  {
    name: "Pack 5 séances",
    price: "À partir de 240€",
    note: "Soit 48€ / séance",
    features: ["5 séances EMS de 20 min", "Coach personnel à chaque séance", "Suivi de progression", "Conseils nutrition inclus"],
    cta: "Demander cette formule",
    highlight: false,
  },
  {
    name: "Pack 10 séances",
    price: "À partir de 440€",
    note: "Soit 44€ / séance",
    features: ["10 séances EMS de 20 min", "Bilan complet + suivi", "Programme nutrition Herbalife", "Réductions partenaires"],
    cta: "Choisir cette formule",
    highlight: true,
  },
  {
    name: "Abonnement mensuel",
    price: "Sur mesure",
    note: "1 séance / semaine",
    features: ["4 séances / mois", "Tarif préférentiel", "Engagement souple", "Pause possible"],
    cta: "Demander un devis",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="Tarifs"
        title={<>Des formules <span className="text-gradient-accent">simples et transparentes</span></>}
        subtitle="Choisissez l'option qui vous convient. Sans paiement en ligne : la souscription se fait directement au studio, sereinement, après votre bilan."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p, i) => (
              <div
                key={p.name}
                className={`reveal relative rounded-3xl p-8 border transition-all hover:-translate-y-1 ${
                  p.highlight
                    ? "bg-gradient-dark text-primary-foreground border-accent shadow-glow"
                    : "bg-card text-foreground border-border shadow-soft hover:shadow-elevated"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-glow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Populaire
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <div className={`text-3xl font-black mb-1 ${p.highlight ? "" : "text-foreground"}`}>{p.price}</div>
                <p className={`text-sm mb-6 ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {p.note}
                </p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 items-start text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlight ? "text-accent" : "text-accent"}`} />
                      <span className={p.highlight ? "text-primary-foreground/90" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="block">
                  <Button variant={p.highlight ? "hero" : "dark"} className="w-full">
                    {p.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10 reveal">
            Tarifs indicatifs. Une simulation personnalisée vous est remise après votre bilan offert.
          </p>
        </div>
      </section>

      <Forms />
      <CTABand />
    </Layout>
  );
};

export default Pricing;