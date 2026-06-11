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
        title="Contact studio EMS Fréjus Plage — 114 Rue Victor Reybaud"
        description="Studio EMS & nutrition Herbalife à Fréjus Plage, 114 Rue Victor Reybaud. Réservez votre séance d'électrostimulation découverte offerte au 06.98.89.04.01."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title={<>Contactez <span className="text-gradient-accent">Espace Nutri-Forme</span></>}
        subtitle="Une question, une réservation, un projet bien-être ? Nous sommes là pour vous accompagner."
      />
      <ContactInfo />
      <section className="py-10 md:py-14 bg-background">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Studio EMS à Fréjus Plage&nbsp;: 114 Rue Victor Reybaud, 83600 Fréjus.
            Réservez votre séance découverte d'électrostimulation offerte au{" "}
            <a href="tel:+33698890401" className="text-accent font-semibold">06.98.89.04.01</a>{" "}
            ou via WhatsApp.
          </p>
        </div>
      </section>
      <Forms />
      <CTABand />
    </Layout>
  );
};

export default Contact;