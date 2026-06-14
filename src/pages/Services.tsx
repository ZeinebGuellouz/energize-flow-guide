import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { Benefits } from "@/components/site/Benefits";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Forms } from "@/components/site/Forms";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "L'EMS est-elle adaptée à tout le monde ?", acceptedAnswer: { "@type": "Answer", text: "Oui, l'électrostimulation EMS s'adapte à tous les niveaux : débutants, sportifs, seniors, personnes en rééducation. Un bilan préalable est réalisé avec votre coach. Quelques contre-indications existent (grossesse, pacemaker)." } },
    { "@type": "Question", name: "À quelle fréquence dois-je venir ?", acceptedAnswer: { "@type": "Answer", text: "Une séance d'EMS par semaine suffit pour obtenir des résultats visibles. Le corps a besoin de 5 à 7 jours pour récupérer." } },
    { "@type": "Question", name: "Quand vais-je voir les premiers résultats ?", acceptedAnswer: { "@type": "Answer", text: "Les premières sensations apparaissent dès la 2e séance. Les résultats visibles s'observent entre la 4e et la 6e séance." } },
    { "@type": "Question", name: "Comment fonctionne l'offre 1ère séance offerte ?", acceptedAnswer: { "@type": "Answer", text: "Réservez votre première séance EMS offerte. Vous bénéficiez d'un bilan personnalisé, de la combinaison et de 20 min d'entraînement encadré. Sans engagement." } },
    { "@type": "Question", name: "Est-ce que je transpire beaucoup ?", acceptedAnswer: { "@type": "Answer", text: "Oui, l'EMS est très intense. Nous vous fournissons une combinaison technique." } },
    { "@type": "Question", name: "Puis-je combiner EMS et nutrition Herbalife ?", acceptedAnswer: { "@type": "Answer", text: "Absolument, c'est notre approche complète. Nous vous accompagnons sur la nutrition pour maximiser vos résultats." } },
  ],
};

const Services = () => {
  return (
    <Layout>
      <SEO
        title="EMS Fréjus Plage — Électrostimulation, perte de poids & remise en forme"
        description="Studio EMS à Fréjus Plage : 20 min d'électrostimulation = 4 h de sport. 350 muscles activés pour perte de poids, prise de masse et remise en forme. 1ère séance offerte."
        path="/services-ems"
        jsonLd={faqJsonLd}
      />
      <PageHero
        eyebrow="Services EMS"
        title={<>L'<span className="text-gradient-accent">électrostimulation</span> nouvelle génération</>}
        subtitle="20 minutes d'entraînement = 4 heures de fitness traditionnel. Activez 350 muscles simultanément pour des résultats accélérés."
      />
      <section className="py-10 md:py-14 bg-background">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            L'électrostimulation musculaire (EMS) active 350 muscles simultanément en
            seulement 20 minutes. Idéale pour la perte de poids, le renforcement
            musculaire et la récupération à Fréjus Plage.
          </p>
        </div>
      </section>
      <Benefits />
      <HowItWorks />
      <Forms />
      <FAQ />
      <CTABand />
    </Layout>
  );
};

export default Services;