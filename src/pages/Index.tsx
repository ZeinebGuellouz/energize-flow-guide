import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Forms } from "@/components/site/Forms";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";
import { ContactInfo } from "@/components/site/ContactInfo";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "L'EMS est-elle adaptée à tout le monde ?", acceptedAnswer: { "@type": "Answer", text: "Oui, l'électrostimulation EMS s'adapte à tous les niveaux : débutants, sportifs, seniors, personnes en rééducation. Un bilan préalable est réalisé avec votre coach. Quelques contre-indications existent (grossesse, pacemaker)." } },
    { "@type": "Question", name: "À quelle fréquence dois-je venir ?", acceptedAnswer: { "@type": "Answer", text: "Une séance d'EMS par semaine suffit pour obtenir des résultats visibles. Le corps a besoin de 5 à 7 jours pour récupérer." } },
    { "@type": "Question", name: "Quand vais-je voir les premiers résultats ?", acceptedAnswer: { "@type": "Answer", text: "Les premières sensations apparaissent dès la 2e séance. Les résultats visibles s'observent entre la 4e et la 6e séance." } },
    { "@type": "Question", name: "Comment se passe la séance découverte offerte ?", acceptedAnswer: { "@type": "Answer", text: "Vous venez à 2, nous vous accueillons, prenons le temps d'un bilan, vous équipons et vous faites une séance complète de 20 min. Aucune obligation d'achat." } },
    { "@type": "Question", name: "Est-ce que je transpire beaucoup ?", acceptedAnswer: { "@type": "Answer", text: "Oui, l'EMS est très intense. Nous vous fournissons une combinaison technique." } },
    { "@type": "Question", name: "Puis-je combiner EMS et nutrition Herbalife ?", acceptedAnswer: { "@type": "Answer", text: "Absolument, c'est notre approche complète. Nous vous accompagnons sur la nutrition pour maximiser vos résultats." } },
  ],
};

const Index = () => {
  return (
    <Layout>
      <SEO
        title="EMS Fréjus Plage — Électrostimulation, perte de poids & nutrition"
        description="Studio EMS premium à Fréjus Plage : 20 min = 4 h de sport, 350 muscles activés. Perte de poids, prise de masse, nutrition Herbalife. Séance découverte offerte."
        path="/"
        jsonLd={faqJsonLd}
      />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Forms />
      <Gallery />
      <Testimonials />
      <CTABand />
      <FAQ />
      <ContactInfo />
    </Layout>
  );
};

export default Index;
