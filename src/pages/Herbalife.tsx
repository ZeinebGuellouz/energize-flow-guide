import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { Apple, Battery, Leaf, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import herbal from "@/assets/herbalife-products.jpg";
import posterNourrissez from "@/assets/poster-nourrissez.jpg.asset.json";
import posterSmoothiesBar from "@/assets/poster-smoothies-bar.jpg.asset.json";
import posterDelicieux from "@/assets/poster-delicieux.jpg.asset.json";
import posterRecuperation from "@/assets/poster-recuperation.jpg.asset.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const smoothieSlides = [
  {
    src: posterSmoothiesBar.url,
    alt: "Bar à smoothies nutritionnels Fréjus Plage",
    title: "Bar à Smoothies",
  },
  {
    src: posterRecuperation.url,
    alt: "Formule récupération après séance EMS",
    title: "Formule Récupération",
  },
  {
    src: posterDelicieux.url,
    alt: "Smoothie Herbalife délicieux et bon pour vous",
    title: "Goût & Nutrition",
  },
  {
    src: posterNourrissez.url,
    alt: "Nourrissez vos résultats — duo EMS + Smoothie",
    title: "Duo EMS + Nutrition",
  },
];

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
    text: "Programmes personnalisés perte ou prise de poids, encadrés par votre coach Herbalife certifié dans notre studio.",
    benefits: ["Suivi personnalisé", "Bilan nutrition offert", "Résultats durables"],
  },
];

const Herbalife = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <SEO
        title="Nutrition Herbalife — Espace Nutri-Forme Fréjus"
        description="Programmes nutrition Herbalife à Fréjus Plage : perte de poids, énergie, performance. Accompagnement personnalisé par votre coach."
        path="/herbalife"
      />

      <PageHero
        eyebrow="Produits Herbalife"
        title={
          <>
            Une nutrition{" "}
            <span className="text-gradient-accent">
              qui démultiplie vos résultats
            </span>
          </>
        }
        subtitle="Parce que sport et nutrition vont de pair, nous vous proposons les solutions Herbalife les mieux adaptées à vos objectifs."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <img
              src={herbal}
              loading="lazy"
              alt="Produits Herbalife nutrition"
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
              Distributeur indépendant Herbalife, nous vous conseillons des produits
              parfaitement adaptés à vos objectifs : silhouette, énergie,
              performance, récupération.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Bénéficiez d'un{" "}
              <strong className="text-foreground">bilan nutrition offert</strong>{" "}
              lors de votre séance découverte EMS et repartez avec un plan personnalisé.
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

      <section className="py-16 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">
              Bar à smoothies
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mt-3 leading-tight">
              Rechargez vos batteries après{" "}
              <span className="text-gradient-accent">chaque séance</span>
            </h2>

            <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-2xl mx-auto">
              Des formules fraîches, gourmandes et préparées sur place pour accompagner
              vos séances EMS.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <div
              onClick={() => setSelectedImage(smoothieSlides[0])}
              className="reveal relative overflow-hidden rounded-3xl shadow-elevated cursor-pointer group min-h-[520px]"
            >
              <img
                src={smoothieSlides[0].src}
                alt={smoothieSlides[0].alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <span className="text-accent font-semibold uppercase tracking-widest text-xs">
                  À découvrir au studio
                </span>

                <h3 className="text-2xl md:text-3xl font-black mt-2">
                  {smoothieSlides[0].title}
                </h3>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {smoothieSlides.slice(1).map((slide, i) => (
                <div
                  key={slide.alt}
                  onClick={() => setSelectedImage(slide)}
                  className={`reveal relative overflow-hidden rounded-3xl shadow-soft hover:shadow-elevated cursor-pointer group ${
                    i === 2 ? "sm:col-span-2" : ""
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading="lazy"
                    className="w-full h-[250px] sm:h-full min-h-[250px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg md:text-xl font-bold">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal">
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Venir goûter nos formules
              </Button>
            </Link>
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
              Nos univers Herbalife
            </h2>
          </div>

          <Carousel opts={{ loop: true, align: "start" }} className="w-full overflow-hidden">
            <CarouselContent className="-ml-4 flex">
              {ranges.map((r, i) => (
                <CarouselItem
                  key={r.title}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 shrink-0"
                >
                  <div
                    className="reveal h-full min-h-[320px] bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow shrink-0">
                        <r.icon className="w-7 h-7 text-accent-foreground" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{r.title}</h3>

                        <p className="text-muted-foreground mb-4">
                          {r.text}
                        </p>

                        <ul className="space-y-1.5">
                          {r.benefits.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="static translate-y-0 -left-0" />
              <CarouselNext className="static translate-y-0 -right-0" />
            </div>
          </Carousel>

          <div className="text-center mt-14 reveal">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Être conseillé·e par un coach
              </Button>
            </Link>
          </div>
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
