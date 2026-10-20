import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { Heart, Target, Users, Award } from "lucide-react";
import studio from "@/assets/Snapchat-1933399201.jpg";
import coach from "@/assets/Snapchat-2024363812.jpg";

const values = [
  {
    icon: Heart,
    t: "Bienveillance",
    d: "Un accompagnement humain, sans jugement, à votre rythme.",
  },
  {
    icon: Target,
    t: "Résultats",
    d: "Une méthode efficace, mesurable et durable.",
  },
  {
    icon: Users,
    t: "Proximité",
    d: "Une équipe à l'écoute, présente à chaque étape.",
  },
  {
    icon: Award,
    t: "Expertise",
    d: "Coachs certifiés et matériel EMS dernière génération.",
  },
];

const About = () => {
  return (
    <Layout>
<SEO
  title="VitaFit EMS Fréjus | Salle de sport EMS & nutrition"
  description="Découvrez VitaFit EMS Fréjus : salle de sport EMS à Fréjus Plage, électrostimulation, coaching personnalisé, nutrition, perte de poids et tonification."
  path="/a-propos"
/>

<PageHero
  eyebrow="À propos"
  title={
    <>
      VitaFit EMS Fréjus,{" "}
      <span className="text-gradient-accent">
        votre salle de sport EMS
      </span>
    </>
  }
  subtitle="Un lieu dédié à l’électrostimulation, au coaching personnalisé, à la nutrition et au bien-être, pour vous accompagner vers des résultats durables."
/>

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <img
              src={studio}
              loading="lazy"
              alt="Studio VitaFit EMS à Fréjus Plage"
              className="rounded-3xl shadow-elevated"
            />
          </div>

          <div className="reveal-right">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Notre histoire
            </span>

            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6">
              Un lieu pensé pour{" "}
              <span className="text-gradient-accent">votre transformation</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
  Implanté à Fréjus Plage, VitaFit combine électrostimulation EMS, coaching personnalisé et accompagnement nutritionnel pour vous aider à atteindre vos objectifs efficacement.
</p>

<p>
  Que votre objectif soit la perte de poids, la tonification, le renforcement musculaire ou le bien-être, notre équipe vous accompagne dans un cadre premium et motivant.
</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-soft">
        <div className="container-px max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Nos valeurs
            </span>

            <h2 className="text-3xl md:text-5xl font-black mt-3">
              Ce qui nous anime
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {values.map((v, i) => (
             <div
  key={v.t}
  className="reveal bg-card rounded-xl p-5 md:p-6 text-center shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border"
  style={{ transitionDelay: `${i * 80}ms` }}
>
  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-accent grid place-items-center mx-auto mb-3 shadow-glow">
    <v.icon className="w-5 h-5 md:w-6 md:h-6 text-accent-foreground" />
  </div>

  <h3 className="font-bold text-base md:text-lg mb-1">
    {v.t}
  </h3>

  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
    {v.d}
  </p>
</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left order-2 lg:order-1">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              L'équipe
            </span>

            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6">
              Des coachs{" "}
              <span className="text-gradient-accent">
                passionnés et certifiés
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Nos coachs vous accompagnent à chaque séance, ajustent
              l'intensité, vérifient votre posture et vous conseillent sur votre
              activité physique et votre alimentation afin d'optimiser vos
              résultats.
            </p>
          </div>

          <div className="reveal-right order-1 lg:order-2">
            <img
              src={coach}
              loading="lazy"
              alt="Coach EMS VitaFit à Fréjus Plage"
              className="rounded-3xl shadow-elevated"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
