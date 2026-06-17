import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { ContactInfo } from "@/components/site/ContactInfo";

const Contact = () => {
  return (
    <Layout>
      <SEO
        title="Contact | VitaFit Fréjus Plage"
        description="Contactez VitaFit Fréjus Plage : adresse, téléphone, horaires et formulaire pour réserver votre séance EMS découverte."
        path="/contact"
      />
      <PageHero
        title="Contactez-nous"
        subtitle="Une question, une réservation ? Notre équipe vous répond rapidement."
      />
      <ContactInfo />
    </Layout>
  );
};

export default Contact;
