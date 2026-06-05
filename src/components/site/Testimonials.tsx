import { Quote, Star } from "lucide-react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=88d66a416da09828&sxsrf=ANbL-n5ycST_8UECStSP_BQWNNJL9BrqUg:1780581163081&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaJDE5uxAhXfUt1FXB_Vu4xYlVfKTF5DYb6BqSHApHHxmx2GQy8TmhclecJ3n80l3jyjHbbq-IFnx9ur01fPhmBxXxaKjzDM-BaiKeeCI3skRUzyMw%3D%3D&q=Studio+d%E2%80%99Electro-Stimulation+Reviews&sa=X&ved=2ahUKEwi1k-Dd3e2UAxXszgIHHU2lMPwQ0bkNegQIIhAH";

const reviews = [
  {
    name: "René Barsi",
    role: "Avis Google",
    text: "À 80 ans, cela fait maintenant deux ans que je fréquente ce studio. Le concept est innovant, parfaitement encadré et adapté à chacun. Une expérience que je recommande vivement.",
  },
  {
    name: "Solène Riou",
    role: "Avis Google",
    text: "Ravie des résultats obtenus ! Tonicité, fermeté et silhouette transformée. L’ambiance est excellente à chaque séance et les conseils nutrition font toute la différence.",
  },
  {
    name: "Ophélie Courieux",
    role: "Avis Google",
    text: "J'ai perdu 11 cm de tour de taille en seulement 3 semaines. Mon corps s'est affiné, ma peau s'est raffermie et j'ai gagné en tonicité. Une expérience incroyable.",
  },
];

const repeatedReviews = [...reviews, ...reviews];

export const Testimonials = () => {
  return (
    <section
      id="avis"
      className="py-12 md:py-20 bg-gradient-dark text-primary-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent))_0%,transparent_50%)]" />

      <div className="container-px max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">
            Avis Google
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 mb-3 leading-tight">
            Ils ont{" "}
            <span className="text-gradient-accent">
              transformé leur quotidien
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-primary-foreground/80">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, k) => (
                <Star key={k} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>

            <span className="font-semibold">5,0</span>
            <span className="text-primary-foreground/60">
              · 72 Avis vérifiés Google
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-5 animate-testimonials-scroll hover:[animation-play-state:paused]">
            {repeatedReviews.map((r, i) => (
              <div
                key={`${r.name}-${i}`}
                className="min-w-[300px] md:min-w-[380px] lg:min-w-[420px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all duration-500"
              >
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-accent mb-2 md:mb-3 opacity-80" />

                <p className="text-primary-foreground/90 leading-relaxed mb-4 text-sm md:text-base">
                  "{r.text}"
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm md:text-base">
                      {r.name}
                    </div>

                    <div className="text-xs md:text-sm text-primary-foreground/60">
                      {r.role}
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, k) => (
                      <Star
                        key={k}
                        className="w-3.5 h-3.5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-semibold transition-colors"
          >
            Voir tous les avis sur Google →
          </a>
        </div>
      </div>
    </section>
  );
};
