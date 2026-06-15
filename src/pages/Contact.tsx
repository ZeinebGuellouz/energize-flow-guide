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
        title="Contact VitaFit Fréjus Plage — 114 Rue Victor Reybaud"
        description="VitaFit, studio EMS & nutrition Herbalife à Fréjus Plage, 114 Rue Victor Reybaud. Réservez votre première séance à -50% au 06.98.89.04.01."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title={<>Contactez <span className="text-gradient-accent">VitaFit Fréjus Plage</span></>}
        subtitle="Une question, une réservation, un projet bien-être ? Nous sommes là pour vous accompagner."
      />
      <ContactInfo />
     
      <Forms />
     
    </Layout>
  );
};

export default Contact;
