import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { Benefits } from "@/components/site/Benefits";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Forms } from "@/components/site/Forms";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";

const Services = () => {
  return (
    <Layout>
      <SEO
        title="Services EMS — Électrostimulation Fréjus Plage"
        description="20 min d'EMS = 4 h de fitness. 350 muscles activés simultanément. Réservez votre séance découverte offerte à Fréjus Plage."
        path="/services-ems"
      />
      <PageHero
        eyebrow="Services EMS"
        title={<>L'<span className="text-gradient-accent">électrostimulation</span> nouvelle génération</>}
        subtitle="20 minutes d'entraînement = 4 heures de fitness traditionnel. Activez 350 muscles simultanément pour des résultats accélérés."
      />
      <Benefits />
      <HowItWorks />
      <Forms />
      <FAQ />
      <CTABand />
    </Layout>
  );
};

export default Services;