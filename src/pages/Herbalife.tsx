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

const posters = [
  { src: posterSmoothiesBar.url, alt: "Bar à smoothies nutritionnels Fréjus Plage" },
  { src: posterRecuperation.url, alt: "Formule récupération après séance EMS" },
  { src: posterDelicieux.url, alt: "Smoothie Herbalife délicieux et bon pour vous" },
  { src: posterNourrissez.url, alt: "Nourrissez vos résultats — duo EMS + Smoothie" },
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
  return (
    <Layout>
      <SEO
        title="Nutrition Herbalife — Espace Nutri-Forme Fréjus"
        description="Programmes nutrition Herbalife à Fréjus Plage : perte de poids, énergie, performance. Accompagnement personnalisé par votre coach."
        path="/herbalife"
      />
      <PageHero
        eyebrow="Produits Herbalife"
        title={<>Une nutrition <span className="text-gradient-accent">qui démultiplie vos résultats</span></>}
        subtitle="Parce que sport et nutrition vont de pair, nous vous proposons les solutions Herbalife les mieux adaptées à vos objectifs."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-px max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <img src={herbal} loading="lazy" alt="Produits Herbalife nutrition" className="rounded-3xl shadow-elevated" />
          </div>
          <div className="reveal-right space-y-5">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">Notre approche</span>
            <h2 className="text-3xl md:text-4xl font-black">
              Nutrition + EMS = <span className="text-gradient-accent">résultats accélérés</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Distributeur indépendant Herbalife, nous vous conseillons des produits
              parfaitement adaptés à vos objectifs : silhouette, énergie, performance, récupération.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Bénéficiez d'un <strong className="text-foreground">bilan nutrition offert</strong> lors
              de votre séance découverte EMS et repartez avec un plan personnalisé.
            </p>
            <Link to="/contact"><Button variant="hero" size="lg">Demander un conseil nutrition</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">Gammes</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3">Nos univers Herbalife</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ranges.map((r, i) => (
              <div
                key={r.title}
                className="reveal bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow shrink-0">
                    <r.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{r.title}</h3>
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
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 reveal">
            <Link to="/contact">
              <Button variant="hero" size="xl">Être conseillé·e par un coach</Button>
            </Link>
          </div>
        </div>
      </section>

      <CTABand />

      <section className="py-12 md:py-20 bg-background">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 reveal">
            <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">Bar à smoothies</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mt-3 leading-tight">
              Notre <span className="text-gradient-accent">univers nutrition</span> en images
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {posters.map((p, i) => (
              <div
                key={p.alt}
                className="reveal overflow-hidden rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 bg-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Herbalife;