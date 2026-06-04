import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { ContactInfo } from "@/components/site/ContactInfo";
import { Forms } from "@/components/site/Forms";
import { CTABand } from "@/components/site/CTABand";

const Contact = () => {
  return (
    <Layout>
      <SEO
        title="Contact — Espace Nutri-Forme Fréjus Plage"
        description="Contactez l'Espace Nutri-Forme à Fréjus : 194 Rue de la République, 06.98.89.04.01. Réservation séance découverte EMS."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title={<>Contactez <span className="text-gradient-accent">Espace Nutri-Forme</span></>}
        subtitle="Une question, une réservation, un projet bien-être ? Nous sommes là pour vous accompagner."
      />
      <ContactInfo />
      <Forms />
      <CTABand />
    </Layout>
  );
};

export default Contact;