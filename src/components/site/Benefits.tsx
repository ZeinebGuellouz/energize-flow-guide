import { Heart, TrendingDown, Dumbbell, Sparkles } from "lucide-react";

const items = [
  { icon: TrendingDown, title: "Perte de poids", text: "Brûlez des calories et affinez votre silhouette en peu de temps." },
  { icon: Dumbbell, title: "Gain musculaire", text: "Renforcez et tonifiez l'ensemble de votre corps en profondeur." },
  { icon: Heart, title: "Meilleure circulation", text: "Stimulez la micro-circulation et boostez votre énergie." },
  { icon: Sparkles, title: "Bien-être global", text: "Sentez-vous plus tonique, plus léger·e, plus serein·e au quotidien." },
];

export const Benefits = () => {
  return (
    <section id="benefices" className="py-12 md:py-32 bg-gradient-soft">
      <div className="container-px max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">Bénéfices</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mt-3 mb-3 md:mb-5 text-foreground leading-tight">
            Une <span className="text-gradient-accent">méthode complète</span> pour votre corps
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            L'électrostimulation EMS active simultanément 350 muscles, soit 90% de votre masse musculaire,
            pour des résultats visibles dès les premières séances.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal group bg-card rounded-2xl p-4 md:p-8 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 border border-border/50"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-accent grid place-items-center mb-3 md:mb-5 shadow-glow group-hover:scale-110 transition-transform duration-500">
                <it.icon className="w-5 h-5 md:w-7 md:h-7 text-accent-foreground" />
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">{it.title}</h3>
              <p className="text-xs md:text-base text-muted-foreground leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};