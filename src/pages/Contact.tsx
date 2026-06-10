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
        description="Contactez l'Espace Nutri-Forme à Fréjus Plage : 114 Rue Victor Reybaud, 06.98.89.04.01. Réservation séance découverte EMS et conseils nutrition Herbalife."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title={<>Contactez <span className="text-gradient-accent">Espace Nutri-Forme</span></>}
        subtitle="Une question, une réservation, un projet bien-être ? Nous sommes là pour vous accompagner."
      />
      <ContactInfo />
      <section className="py-12 md:py-16 bg-background">
        <div className="container-px max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Venir au studio à Fréjus Plage</h2>
          <p className="text-muted-foreground">
            L'Espace Nutri-Forme se situe au <strong>114 Rue Victor Reybaud, 83600 Fréjus Plage</strong>,
            à quelques minutes du bord de mer et facilement accessible depuis Saint-Raphaël,
            Puget-sur-Argens, Roquebrune-sur-Argens et Saint-Aygulf. Un parking gratuit est
            disponible à proximité immédiate du studio.
          </p>
          <h3 className="text-xl font-bold mt-6 mb-2">Horaires d'ouverture</h3>
          <ul className="text-muted-foreground">
            <li>Lundi au vendredi : 9h00 – 20h00</li>
            <li>Samedi : 9h00 – 13h00</li>
            <li>Dimanche : fermé</li>
          </ul>
          <h3 className="text-xl font-bold mt-6 mb-2">Nous contacter</h3>
          <p className="text-muted-foreground">
            Pour réserver votre <strong>séance découverte EMS offerte</strong>, demander un
            <strong> bilan nutrition Herbalife</strong> ou simplement poser une question,
            appelez-nous au <a href="tel:+33698890401" className="text-accent font-semibold">06.98.89.04.01</a>,
            écrivez-nous via WhatsApp, ou utilisez le formulaire ci-dessous. Nous répondons
            généralement sous 24 h ouvrées.
          </p>
          <h3 className="text-xl font-bold mt-6 mb-2">Réservation & première séance</h3>
          <p className="text-muted-foreground">
            Votre première séance d'électrostimulation dure environ 45 minutes (accueil, bilan,
            20 minutes d'EMS, conseils). Prévoyez une tenue de sport confortable : nous vous
            fournissons la combinaison technique et l'eau. Aucun engagement n'est requis pour
            la séance découverte.
          </p>
        </div>
      </section>
      <Forms />
      <CTABand />
    </Layout>
  );
};

export default Contact;