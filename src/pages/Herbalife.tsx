import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { Apple, Battery, Leaf, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import herbal from "@/assets/herbalife-products.jpg";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ranges = [
  {
    icon: Apple,
    title: "Nutrition équilibrée",
    text: "Substituts de repas riches en protéines, vitamines et minéraux. Le Formula 1 pour un petit-déjeuner ou repas équilibré en moins de 5 minutes.",
    benefits: ["25 vitamines & minéraux", "Protéines végétales et lait", "Goûts variés"],
  },
  {
    icon: Battery,
    title: "Énergie & performance",
    text: "Boissons et compléments pré-entraînement pour booster votre énergie, votre concentration et votre endurance.",
    benefits: ["Caféine naturelle", "Zéro sucre ajouté option", "Effet immédiat"],
  },
  {
    icon: Leaf,
    title: "Récupération",
    text: "Protéines de haute qualité pour favoriser la récupération musculaire après vos séances EMS et accélérer la prise de masse maigre.",
    benefits: ["Whey & végétale", "Acides aminés essentiels", "Digestion facile"],
  },
  {
    icon: Scale,
    title: "Gestion du poids",
    text: "Programmes personnalisés perte ou prise de poids, encadrés par votre coach nutrition dans notre studio.",
    benefits: ["Suivi personnalisé", "Bilan nutrition offert", "Résultats durables"],
  },
];

const Herbalife = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <SEO
        title="Nutrition Fréjus — Perte de poids, énergie & prise de masse"
        description="Nutrition à Fréjus Plage : programmes nutrition sportive pour perte de poids, prise de masse maigre et énergie. Bar à smoothies et bilan nutrition offert."
        path="/herbalife"
      />

      <PageHero
        eyebrow="Nutrition"
        title={
          <>
            Une nutrition{" "}
            <span className="text-gradient-accent">
              qui démultiplie vos résultats
            </span>
          </>
        }
        subtitle="Parce que sport et nutrition vont de pair, nous vous accompagnons avec des solutions adaptées à vos objectifs."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <img
              src={herbal}
              loading="lazy"
              alt="Produits nutritionnels"
              className="rounded-3xl shadow-elevated"
            />
          </div>

          <div className="reveal-right space-y-5">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Notre approche
            </span>

            <h2 className="text-3xl md:text-4xl font-black">
              Nutrition + EMS ={" "}
              <span className="text-gradient-accent">résultats accélérés</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous vous conseillons des solutions nutritionnelles adaptées à vos
              objectifs : silhouette, énergie, performance et récupération.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Bénéficiez d'un{" "}
              <strong className="text-foreground">bilan nutrition offert</strong>{" "}
              lors de votre première séance EMS et repartez avec un plan personnalisé.
            </p>

            <div className="flex justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Demander un conseil nutrition
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Gammes
            </span>

            <h2 className="text-3xl md:text-5xl font-black mt-3">
              Nos univers nutrition
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ranges.map((r, i) => (
              <div
                key={r.title}
                className="reveal h-full bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow mb-5">
                  <r.icon className="w-7 h-7 text-accent-foreground" />
                </div>

                <h3 className="text-xl font-bold mb-3">{r.title}</h3>

                <p className="text-muted-foreground mb-4">{r.text}</p>

                <ul className="space-y-1.5">
                  {r.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 reveal">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Être conseillé·e par un coach
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              EMS & Nutrition
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-3">
              Découvrez nos offres en un coup d'œil
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <button
              type="button"
              onClick={() =>
                setSelectedImage({
                  src: "/images/flyer-ems-revolution.jpg",
                  alt: "Affiche EMS Révolution — 1ère séance à -50%",
                })
              }
              className="reveal group overflow-hidden rounded-3xl shadow-elevated hover:shadow-glow transition-all bg-card"
            >
              <img
                src="/images/flyer-ems-revolution.jpg"
                alt="Affiche EMS Révolution — 1ère séance à -50%"
                loading="lazy"
                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
              />
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedImage({
                  src: "/images/flyer-vitafit-smoothies.jpg",
                  alt: "Affiche VitaFit Bar à Smoothies — frais, sain, gourmand",
                })
              }
              className="reveal group overflow-hidden rounded-3xl shadow-elevated hover:shadow-glow transition-all bg-card"
            >
              <img
                src="/images/flyer-vitafit-smoothies.jpg"
                alt="Affiche VitaFit Bar à Smoothies — frais, sain, gourmand"
                loading="lazy"
                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
              />
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Nutrition à Fréjus Plage&nbsp;: protéines, boissons énergie,
            programme perte de poids personnalisé et bar à smoothies au studio
            pour prolonger les bénéfices de votre séance EMS.
          </p>
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
