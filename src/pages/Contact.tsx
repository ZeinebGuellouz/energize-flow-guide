import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { ContactInfo } from "@/components/site/ContactInfo";
import { Forms } from "@/components/site/Forms";
import { CTABand } from "@/components/site/CTABand";

const Contact = () => {
  return (
    <Layout>
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