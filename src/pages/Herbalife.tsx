import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { Battery, Heart, Scale, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const benefits = [
  {
    icon: Battery,
    title: "Énergie durable",
    text: "Des solutions nutritionnelles pour soutenir votre forme et votre vitalité au quotidien.",
  },
  {
    icon: Sparkles,
    title: "Récupération musculaire",
    text: "Un accompagnement pensé pour prolonger les bénéfices de vos séances EMS.",
  },
  {
    icon: Scale,
    title: "Contrôle du poids",
    text: "Des conseils adaptés à vos objectifs : perte de poids, tonification ou maintien.",
  },
  {
    icon: Heart,
    title: "Bien-être quotidien",
    text: "Une approche globale pour vous sentir plus léger·e, plus tonique et plus en forme.",
  },
];

const Herbalife = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <SEO
        title="Nutrition Fréjus — EMS, récupération & bar à smoothies"
        description="Nutrition à Fréjus Plage : accompagnement nutritionnel, récupération après séance EMS, contrôle du poids, énergie et bar à smoothies VitaFit."
        path="/herbalife"
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left space-y-6">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Nutrition & récupération
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Nutrition & récupération pour{" "}
              <span className="text-gradient-accent">
                maximiser vos résultats
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Chez VitaFit, l'entraînement ne s'arrête pas à la séance EMS. Nous
              vous accompagnons avec des solutions nutritionnelles adaptées à vos
              objectifs : perte de poids, énergie, récupération et bien-être.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Réserver ma séance
                </Button>
              </Link>

              <Link to="/tarifs">
                <Button variant="outline" size="lg">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedImage({
                src: "/images/flyer-ems-revolution.jpg",
                alt: "Affiche EMS Révolution — 1ère séance à -50%",
              })
            }
            className="reveal-right group overflow-hidden rounded-3xl shadow-elevated hover:shadow-glow transition-all bg-card"
          >
            <img
              src="/images/flyer-ems-revolution.jpg"
              alt="Affiche EMS Révolution — 1ère séance à -50%"
              loading="eager"
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
            />
          </button>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              EMS + Nutrition
            </span>

            <h2 className="text-3xl md:text-5xl font-black mt-3">
              Pourquoi associer EMS et nutrition ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="reveal h-full bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow mb-5">
                  <b.icon className="w-7 h-7 text-accent-foreground" />
                </div>

                <h3 className="text-xl font-bold mb-3">{b.title}</h3>

                <p className="text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <button
            type="button"
            onClick={() =>
              setSelectedImage({
                src: "/images/flyer-vitafit-smoothies.jpg",
                alt: "Affiche VitaFit Bar à Smoothies — frais, sain, gourmand",
              })
            }
            className="reveal-left group overflow-hidden rounded-3xl shadow-elevated hover:shadow-glow transition-all bg-card order-2 lg:order-1"
          >
            <img
              src="/images/flyer-vitafit-smoothies.jpg"
              alt="Affiche VitaFit Bar à Smoothies — frais, sain, gourmand"
              loading="lazy"
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
            />
          </button>

          <div className="reveal-right space-y-6 order-1 lg:order-2">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Bar à smoothies VitaFit
            </span>

            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Des smoothies sains, gourmands et{" "}
              <span className="text-gradient-accent">riches en nutriments</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Préparés à partir d'ingrédients sélectionnés, nos smoothies
              apportent protéines, vitamines et minéraux pour accompagner vos
              objectifs sportifs et nutritionnels.
            </p>

            <Link to="/contact">
              <Button variant="hero" size="lg">
                Découvrir le bar à smoothies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-6xl mx-auto text-center">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">
            Votre formule complète
          </span>

          <h2 className="text-3xl md:text-5xl font-black mt-3 mb-10">
            EMS → Hydratation → Nutrition → Résultats
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Une approche globale pour améliorer votre silhouette, votre forme et
            votre énergie au quotidien.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black">
            Prêt(e) à découvrir l'expérience VitaFit ?
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mt-5 mb-8">
            Profitez de -50 % sur votre première séance EMS.
          </p>

          <Link to="/contact">
            <Button variant="hero" size="xl">
              Réserver ma séance
            </Button>
          </Link>
        </div>
      </section>

      <CTABand />

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-6xl p-0 bg-transparent border-none shadow-none">
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[90vh] object-contain rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Herbalife;
