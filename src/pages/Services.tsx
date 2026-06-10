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
      <section className="py-12 md:py-16 bg-background">
        <div className="container-px max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Qu'est-ce que l'EMS (électrostimulation musculaire)&nbsp;?</h2>
          <p className="text-muted-foreground">
            L'<strong>EMS, ou électrostimulation musculaire</strong>, est une méthode
            d'entraînement qui utilise des impulsions électriques de faible intensité pour
            provoquer la contraction des muscles, en complément de mouvements simples réalisés
            avec votre coach. Vous portez une combinaison équipée d'électrodes qui stimulent
            simultanément les principaux groupes musculaires&nbsp;: cuisses, fessiers, abdominaux,
            dos, pectoraux, épaules et bras.
          </p>
          <h3 className="text-xl font-bold mt-6 mb-2">Comment se passe une séance&nbsp;?</h3>
          <p className="text-muted-foreground">
            Une séance dure <strong>20 minutes</strong> et se déroule en individuel ou en duo
            avec un coach dédié. Après un échauffement court, vous enchaînez des exercices
            fonctionnels (squats, fentes, gainage, tractions élastiques) pendant que les
            impulsions stimulent jusqu'à <strong>350 muscles en simultané</strong>. L'intensité
            est réglée précisément zone par zone, en fonction de votre ressenti.
          </p>
          <h3 className="text-xl font-bold mt-6 mb-2">Quels sont les bénéfices&nbsp;?</h3>
          <ul className="text-muted-foreground">
            <li><strong>Perte de poids et affinement</strong> de la silhouette en quelques semaines</li>
            <li><strong>Renforcement musculaire global</strong> et raffermissement (fessiers, cuisses, ventre, bras)</li>
            <li>Amélioration de la <strong>posture</strong> et soulagement des douleurs dorsales</li>
            <li><strong>Gain de temps</strong>&nbsp;: 2 séances de 20 min par semaine suffisent</li>
            <li>Préservation des articulations&nbsp;: pas de port de charges lourdes</li>
            <li><strong>Récupération sportive</strong> et préparation physique accélérées</li>
          </ul>
          <h3 className="text-xl font-bold mt-6 mb-2">Pour qui&nbsp;?</h3>
          <p className="text-muted-foreground">
            L'EMS s'adresse aux personnes qui souhaitent <strong>perdre du poids</strong>,
            se <strong>remettre au sport</strong> en douceur, <strong>tonifier leur corps</strong>,
            préparer l'été, soulager le dos, ou optimiser leur préparation sportive. La méthode
            est contre-indiquée en cas de grossesse, pacemaker, certaines pathologies cardiaques
            ou neurologiques&nbsp;: un questionnaire de santé est rempli avant la première séance.
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