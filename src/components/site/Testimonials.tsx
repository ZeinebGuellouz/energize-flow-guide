import { Quote, Star } from "lucide-react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Studio+d%E2%80%99Electro-Stimulation+Fr%C3%A9jus+Reviews";

const reviews = [
  {
    name: "Sophie M.",
    role: "Avis Google",
    text: "Studio super propre, équipe à l'écoute. En 2 mois, -6 kg et une silhouette tonique !",
  },
  {
    name: "Karim B.",
    role: "Avis Google",
    text: "20 min d'EMS et je sens vraiment la séance. Parfait pour mon planning chargé.",
  },
  {
    name: "Élodie R.",
    role: "Avis Google",
    text: "Accompagnement nutrition au top, des résultats visibles et durables. Je recommande !",
  },
];

export const Testimonials = () => {
  return (
    <section id="avis" className="py-12 md:py-20 bg-gradient-dark text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container-px max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">Avis Google</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 mb-3 leading-tight">
            Ils ont <span className="text-gradient-accent">transformé leur quotidien</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-primary-foreground/80">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, k) => (
                <Star key={k} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-semibold">5,0</span>
            <span className="text-primary-foreground/60">· Avis vérifiés Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="reveal bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-accent mb-2 md:mb-3 opacity-80" />
              <p className="text-primary-foreground/90 leading-relaxed mb-4 text-sm md:text-base">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm md:text-base">{r.name}</div>
                  <div className="text-xs md:text-sm text-primary-foreground/60">{r.role}</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          ))}
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