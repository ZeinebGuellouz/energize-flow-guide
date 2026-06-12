import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Heart, Target, Users, Award } from "lucide-react";
import studio from "@/assets/studio-interior.jpg";
import coach from "@/assets/coach-session.jpg";

const values = [
  { icon: Heart, t: "Bienveillance", d: "Un accompagnement humain, sans jugement, à votre rythme." },
  { icon: Target, t: "Résultats", d: "Une méthode efficace, mesurable et durable." },
  { icon: Users, t: "Proximité", d: "Une équipe à l'écoute, présente à chaque étape." },
  { icon: Award, t: "Expertise", d: "Coachs certifiés et matériel EMS dernière génération." },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="À propos VitaFit — Studio EMS & coach remise en forme à Fréjus Plage"
        description="VitaFit Fréjus Plage : coachs certifiés EMS, nutrition Herbalife et coaching personnalisé pour perte de poids, prise de masse et remise en forme durable."
        path="/a-propos"
      />
      <PageHero
        eyebrow="À propos"
        title={<>VitaFit, <span className="text-gradient-accent">votre studio EMS à Fréjus Plage</span></>}
        subtitle="Une approche complète : entraînement EMS, nutrition, coaching personnalisé. Pour vous sentir bien dans votre corps, durablement."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <img src={studio} loading="lazy" alt="Notre studio EMS" className="rounded-3xl shadow-elevated" />
          </div>
          <div className="reveal-right">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">Notre histoire</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6">
              Un lieu pensé pour <span className="text-gradient-accent">votre transformation</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Implanté au cœur de Fréjus Plage, VitaFit est né de la volonté
                d'offrir une expérience fitness et bien-être réellement adaptée à chacun.
              </p>
              <p>
                Notre méthode combine l'<strong className="text-foreground">électrostimulation EMS dernière génération</strong>,
                un coaching personnalisé et une approche nutrition Herbalife pour des résultats
                visibles, durables et sans frustration.
              </p>
              <p>
                Que vous soyez débutant·e, sportif·ve confirmé·e, en reprise d'activité ou en
                quête de bien-être, nous vous accueillons dans un cadre premium, pensé pour vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">Nos valeurs</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3">Ce qui nous anime</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.t} className="reveal bg-card rounded-2xl p-8 text-center shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center mx-auto mb-4 shadow-glow">
                  <v.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">{v.t}</h3>
                <p className="text-muted-foreground text-sm">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left order-2 lg:order-1">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">L'équipe</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6">
              Des coachs <span className="text-gradient-accent">passionnés et certifiés</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tous nos coachs sont formés à l'EMS et à la nutrition Herbalife. Ils vous
              accompagnent à chaque séance, ajustent l'intensité, vérifient votre posture
              et vous conseillent sur l'hygiène de vie pour optimiser vos résultats.
            </p>
          </div>
          <div className="reveal-right order-1 lg:order-2">
            <img src={coach} loading="lazy" alt="Coach EMS Fréjus" className="rounded-3xl shadow-elevated" />
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-gradient-soft">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            VitaFit est votre studio EMS et nutrition à Fréjus Plage&nbsp;:
            une équipe certifiée, un coaching personnalisé et une méthode qui combine
            électrostimulation, Herbalife et suivi sur-mesure.
          </p>
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default About;