import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Sophie M.",
    role: "Fréjus",
    text: "En 2 mois, -6 kg et une silhouette tonique. Équipe au top !",
  },
  {
    name: "Karim B.",
    role: "Saint-Raphaël",
    text: "20 min et une énergie folle. Parfait pour mon planning chargé.",
  },
  {
    name: "Élodie R.",
    role: "Puget-sur-Argens",
    text: "EMS + coaching nutrition : résultats visibles et durables.",
  },
];

export const Testimonials = () => {
  return (
    <section id="avis" className="py-12 md:py-20 bg-gradient-dark text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container-px max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">Témoignages</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 mb-3 leading-tight">
            Ils ont <span className="text-gradient-accent">transformé leur quotidien</span>
          </h2>
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
      </div>
    </section>
  );
};