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
    {
      "@type": "Question",
      name: "Combien de temps dure une séance EMS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une séance dure environ 20 minutes. Grâce à l'électrostimulation, cela équivaut à plusieurs heures d'entraînement traditionnel tout en étant encadré par un coach.",
      },
    },
    {
      "@type": "Question",
      name: "Quand vais-je voir les premiers résultats ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La plupart de nos clients ressentent une meilleure tonicité et plus d'énergie dès les premières séances. Les résultats visibles apparaissent généralement après 4 à 6 séances selon vos objectifs et votre régularité.",
      },
    },
    {
      "@type": "Question",
      name: "L'EMS est-elle adaptée aux débutants ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. L'intensité est entièrement personnalisée. Que vous soyez débutant, sportif confirmé ou en reprise d'activité, la séance est adaptée à votre niveau.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de séances par semaine sont recommandées ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une à deux séances par semaine sont généralement recommandées pour obtenir des résultats optimaux. Votre coach adaptera la fréquence en fonction de vos objectifs, de votre niveau et de votre disponibilité.",
      },
    },
    {
      "@type": "Question",
      name: "Que comprend la séance découverte à 19,95 € ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La séance découverte comprend un bilan personnalisé, la mise à disposition de la combinaison EMS, une séance encadrée de 20 minutes et des conseils adaptés à vos objectifs.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il être en bonne condition physique pour commencer ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. L'EMS convient à différents profils et permet de travailler efficacement même si vous manquez de temps ou reprenez une activité sportive.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je associer EMS et accompagnement nutritionnel ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Nous proposons un accompagnement nutritionnel et un bar à smoothies afin d'optimiser vos résultats, votre récupération et votre bien-être global.",
      },
    },
    {
      "@type": "Question",
      name: "Dois-je apporter quelque chose pour ma séance ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous n’avez besoin d’aucun équipement particulier. Venez simplement avec une tenue de sport confortable, une paire de baskets propres et pensez à bien vous hydrater avant votre séance.",
      },
    },
  ],
};

const Index = () => {
  return (
    <Layout>
      <SEO
        title="VitaFit EMS Fréjus | Salle de sport EMS & coaching à Fréjus Plage"
        description="VitaFit EMS Fréjus est une salle de sport EMS à Fréjus Plage spécialisée dans l'électrostimulation, le coaching personnalisé, la perte de poids, la tonification et l'accompagnement nutritionnel."
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

    </Layout>
  );
};

export default Index;
