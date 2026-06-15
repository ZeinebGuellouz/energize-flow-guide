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
      name: "Que comprend la séance découverte à 19,50 € ?",
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
        text: "Non. Nous fournissons la combinaison EMS. Il vous suffit de venir avec votre motivation et une tenue confortable pour après la séance.",
      },
    },
  ],
};

const Services = () => {
  return (
    <Layout>
      <SEO
        title="EMS Fréjus Plage | Électrostimulation, perte de poids & remise en forme"
        description="Studio EMS à Fréjus Plage : 20 min d'électrostimulation = 4 h de sport. 350 muscles activés pour perte de poids, prise de masse et remise en forme. -50% sur la première séance."
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
