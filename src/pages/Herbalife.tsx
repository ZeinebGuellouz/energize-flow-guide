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

const steps = ["EMS", "Hydratation", "Nutrition", "Résultats"];

const Herbalife = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <SEO
        title="Nutrition Fréjus — EMS, récupération & bar à smoothies"
        description="Nutrition à Fréjus Plage : accompagnement nutritionnel, récupération après séance EMS, contrôle du poids, énergie et bar à smoothies VitaFit."
        path="/herbalife"
      />

      <section className="py-10 md:py-28 bg-background overflow-hidden">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="reveal-left space-y-5 text-center lg:text-left">
            <span className="inline-block text-accent font-semibold uppercase tracking-widest text-xs md:text-sm">
              Nutrition & récupération
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
              Nutrition & récupération pour{" "}
              <span className="text-gradient-accent">
                maximiser vos résultats
              </span>
            </h1>

            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Chez VitaFit, l'entraînement ne s'arrête pas à la séance EMS. Nous
              vous accompagnons avec des solutions nutritionnelles adaptées à vos
              objectifs : perte de poids, énergie, récupération et bien-être.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Réserver ma séance
                </Button>
              </Link>

              <Link to="/tarifs" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
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
            className="reveal-right group overflow-hidden rounded-2xl md:rounded-3xl shadow-elevated hover:shadow-glow transition-all bg-card max-w-sm sm:max-w-md lg:max-w-none mx-auto"
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

      <section className="py-12 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-xs md:text-sm">
              EMS + Nutrition
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mt-3 leading-tight">
              Pourquoi associer EMS et nutrition ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="reveal h-full bg-card rounded-2xl p-5 md:p-8 shadow-soft border border-border"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4 md:block">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow shrink-0 md:mb-5">
                    <b.icon className="w-6 h-6 md:w-7 md:h-7 text-accent-foreground" />
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-3">
                      {b.title}
                    </h3>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {b.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-28 bg-background overflow-hidden">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="reveal-right space-y-5 order-1 lg:order-2 text-center lg:text-left">
            <span className="text-accent font-semibold uppercase tracking-widest text-xs md:text-sm">
              Bar à smoothies VitaFit
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight">
              Des smoothies sains, gourmands et{" "}
              <span className="text-gradient-accent">riches en nutriments</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Préparés à partir d'ingrédients sélectionnés, nos smoothies
              apportent protéines, vitamines et minéraux pour accompagner vos
              objectifs sportifs et nutritionnels.
            </p>

            <Link to="/contact" className="inline-block w-full sm:w-auto">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Découvrir le bar à smoothies
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedImage({
                src: "/images/flyer-vitafit-smoothies.jpg",
                alt: "Affiche VitaFit Bar à Smoothies — frais, sain, gourmand",
              })
            }
            className="reveal-left group overflow-hidden rounded-2xl md:rounded-3xl shadow-elevated hover:shadow-glow transition-all bg-card order-2 lg:order-1 max-w-sm sm:max-w-md lg:max-w-none mx-auto"
          >
            <img
              src="/images/flyer-vitafit-smoothies.jpg"
              alt="Affiche VitaFit Bar à Smoothies — frais, sain, gourmand"
              loading="lazy"
              className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
            />
          </button>
        </div>
      </section>

      <section className="py-12 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-6xl mx-auto text-center">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs md:text-sm">
            Votre formule complète
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mt-3 mb-8">
            EMS → Hydratation → Nutrition → Résultats
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-8">
            {steps.map((step, i) => (
              <div
                key={step}
                className="bg-card rounded-2xl p-4 md:p-6 shadow-soft border border-border"
              >
                <span className="text-accent font-black text-sm md:text-base">
                  0{i + 1}
                </span>
                <p className="font-bold text-base md:text-xl mt-1">{step}</p>
              </div>
            ))}
          </div>

          <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Une approche globale pour améliorer votre silhouette, votre forme et
            votre énergie au quotidien.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-28 bg-background">
        <div className="container-px max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black">
            Prêt(e) à découvrir l'expérience VitaFit ?
          </h2>

          <p className="text-base md:text-xl text-muted-foreground mt-4 mb-6 md:mb-8">
            Profitez de -50 % sur votre première séance EMS.
          </p>

          <Link to="/contact" className="inline-block w-full sm:w-auto">
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
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
        <DialogContent className="w-[95vw] max-w-5xl p-2 md:p-0 bg-transparent border-none shadow-none">
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Herbalife;
