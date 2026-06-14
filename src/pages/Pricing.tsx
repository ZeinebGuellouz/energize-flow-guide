import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, User, Users } from "lucide-react";
import { CTABand } from "@/components/site/CTABand";
import { useState } from "react";
import { DiscoveryForm } from "@/components/site/DiscoveryForm";
import { EmsRequestForm } from "@/components/site/EmsRequestForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const packs = [
  {
    id: "decouverte",
    name: "1ère séance",
    price: "19,95€",
    note: "Soit -50% (39,90€)",
    features: [
      "Bilan personnalisé",
      "1 séance EMS de 20 min",
      "Combinaison fournie",
      "Sans engagement",
    ],
    cta: "Réserver ma 1ère séance",
    highlight: false,
  },
  {
    id: "seance1",
    name: "1 séance",
    price: "39,90€",
    note: "Séance unique",
    features: [
      "1 séance EMS de 20 min",
      "Coach personnel",
      "Accès au bar à smoothies",
      "Sans engagement",
    ],
    cta: "Choisir cette formule",
    highlight: false,
    formule: "1 séance",
  },
  {
    id: "pack5",
    name: "Pack 5 séances",
    price: "185€",
    note: "Soit 37€ / séance",
    features: [
      "5 séances EMS de 20 min",
      "Coach personnel à chaque séance",
      "Suivi de progression",
    ],
    cta: "Choisir cette formule",
    highlight: false,
    formule: "Pack 5 séances",
  },
  {
    id: "pack10",
    name: "Pack 10 séances",
    price: "315€",
    note: "Soit 31,50€ / séance",
    features: [
      "10 séances EMS de 20 min",
      "Bilan complet + suivi",
      "Réductions partenaires",
    ],
    cta: "Choisir cette formule",
    highlight: true,
    formule: "Pack 10 séances",
  },
  {
    id: "pack20",
    name: "Pack 20 séances",
    price: "560€",
    note: "Soit 28€ / séance",
    features: [
      "20 séances EMS de 20 min",
      "Bilan complet + suivi avancé",
      "Réductions partenaires",
    ],
    cta: "Choisir cette formule",
    highlight: false,
    formule: "Pack 20 séances",
  },
];

type AboPlan = {
  id: string;
  name: string;
  price: string;
  note: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  formule: string;
};

const aboSolo: AboPlan[] = [
  {
    id: "abo-solo-4",
    name: "4 séances / mois",
    price: "115€/mois",
    note: "Abonnement annuel solo",
    features: [
      "4 séances EMS / mois",
      "Engagement annuel",
      "Coach personnel",
     
    ],
    cta: "Choisir cet abonnement",
    formule: "Abonnement annuel solo — 4 séances/mois",
  },
  {
    id: "abo-solo-8",
    name: "8 séances / mois",
    price: "190€/mois",
    note: "Abonnement annuel solo",
    features: [
      "8 séances EMS / mois",
      "Engagement annuel",
      "Coach personnel + suivi",
     
    ],
    cta: "Choisir cet abonnement",
    highlight: true,
    formule: "Abonnement annuel solo — 8 séances/mois",
  },
  {
    id: "abo-solo-12",
    name: "12 séances / mois",
    price: "250€/mois",
    note: "Abonnement annuel solo",
    features: [
      "12 séances EMS / mois",
      "Engagement annuel",
      "Coach personnel + suivi avancé",
     
    ],
    cta: "Choisir cet abonnement",
    formule: "Abonnement annuel solo — 12 séances/mois",
  },
];

const aboDuo: AboPlan[] = [
  {
    id: "abo-duo-4",
    name: "4 séances / mois",
    price: "105€/mois",
    note: "Abonnement annuel duo/pers",
    features: [
      "4 séances EMS / mois",
      "Engagement annuel",
      "Coach personnel",
     
    ],
    cta: "Choisir cet abonnement",
    formule: "Abonnement annuel duo — 4 séances/mois",
  },
  {
    id: "abo-duo-8",
    name: "8 séances / mois",
    price: "180€/mois",
    note: "Abonnement annuel duo/pers",
    features: [
      "8 séances EMS / mois",
      "Engagement annuel",
      "Coach personnel + suivi",
     
    ],
    cta: "Choisir cet abonnement",
    highlight: true,
    formule: "Abonnement annuel duo — 8 séances/mois",
  },
  {
    id: "abo-duo-12",
    name: "12 séances / mois",
    price: "240€/mois",
    note: "Abonnement annuel duo/pers",
    features: [
      "12 séances EMS / mois",
      "Engagement annuel",
      "Coach personnel + suivi avancé",
     
    ],
    cta: "Choisir cet abonnement",
    formule: "Abonnement annuel duo — 12 séances/mois",
  },
];

const Pricing = () => {
  const [openPlan, setOpenPlan] = useState<string | null>(null);
  const [aboMode, setAboMode] = useState<"solo" | "duo">("solo");

  const allPlans = [...packs, ...aboSolo, ...aboDuo];
  const activePlan = allPlans.find((p) => p.id === openPlan);

  const renderCard = (p: (typeof packs)[0] | AboPlan, i: number) => (
    <div
      key={p.id}
      className={`relative rounded-3xl p-6 md:p-8 border transition-all hover:-translate-y-1 flex flex-col ${
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
      <div
        className={`text-2xl md:text-3xl font-black mb-1 ${
          p.highlight ? "" : "text-foreground"
        }`}
      >
        {p.price}
      </div>
      <p
        className={`text-sm mb-6 ${
          p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        {p.note}
      </p>
      <ul className="space-y-3 mb-8 flex-1">
        {p.features.map((f) => (
          <li key={f} className="flex gap-2 items-start text-sm">
            <Check
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                p.highlight ? "text-accent" : "text-accent"
              }`}
            />
            <span className={p.highlight ? "text-primary-foreground/90" : ""}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <Button
        variant={p.highlight ? "hero" : "dark"}
        className="w-full"
        onClick={() => setOpenPlan(p.id)}
      >
        {p.cta}
      </Button>
    </div>
  );

  return (
    <Layout>
      <SEO
        title="Tarifs EMS Fréjus Plage — 1ère séance offerte, packs & abonnements"
        description="Tarifs EMS à Fréjus : 1ère séance offerte, packs 1 à 20 séances dès 28€, abonnements solo & duo pour perte de poids, prise de masse et remise en forme."
        path="/tarifs"
      />
      <PageHero
        eyebrow="Tarifs"
        title={
          <>
            Des formules{" "}
            <span className="text-gradient-accent">simples et transparentes</span>
          </>
        }
        subtitle="Choisissez l'option qui vous convient. Sans paiement en ligne : la souscription se fait directement au studio, sereinement, après votre bilan."
      />

      <section className="py-8 md:py-10 bg-background">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Tarifs EMS à Fréjus Plage&nbsp;: 1ère séance offerte, séances à
            l'unité, packs ou abonnements annuels solo et duo. Coach, combinaison et
            bar à smoothies inclus. Frais d'inscription uniques de 59€ pour les
            abonnements.
          </p>
        </div>
      </section>

      {/* Packs séances */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">
              Séances à l'unité & packs
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 leading-tight">
              Payez au fur et à mesure
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {packs.map((p, i) => renderCard(p, i))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10 reveal">
            Tarifs indicatifs. Une simulation personnalisée vous est remise après
            votre bilan offert.
          </p>
        </div>
      </section>

      {/* Abonnements annuels */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-px max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">
              Abonnements annuels
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 leading-tight">
              Engagez-vous et économisez
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base">
              Choisissez votre rythme : 4, 8 ou 12 séances par mois. En solo ou à
              deux pour encore plus de motivation.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-10 reveal">
            <div className="inline-flex rounded-full bg-muted p-1 border border-border">
              <button
                onClick={() => setAboMode("solo")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  aboMode === "solo"
                    ? "bg-gradient-dark text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" /> Solo
              </button>
              <button
                onClick={() => setAboMode("duo")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  aboMode === "duo"
                    ? "bg-gradient-dark text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4" /> Duo
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {(aboMode === "solo" ? aboSolo : aboDuo).map((p, i) =>
              renderCard(p, i)
            )}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10 reveal">
            Frais d'inscription : <span className="font-semibold text-foreground">59€</span> (uniques, à la souscription).
          </p>
        </div>
      </section>

      <Dialog
        open={openPlan !== null}
        onOpenChange={(o) => !o && setOpenPlan(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 sm:p-0 border-0 bg-transparent shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>{activePlan?.name ?? "Réservation"}</DialogTitle>
          </DialogHeader>
          {activePlan?.id === "decouverte" ? (
            <DiscoveryForm />
          ) : activePlan ? (
            <EmsRequestForm
              defaultFormule={activePlan.formule}
              title={activePlan.name}
              subtitle={`Demande pour la formule « ${activePlan.formule} »`}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <CTABand />
    </Layout>
  );
};

export default Pricing;
