import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Sophie M.",
    role: "Fréjus",
    text: "En 2 mois j'ai perdu 6 kg et retrouvé une silhouette tonique. L'équipe est bienveillante et très pro. Une vraie révélation !",
  },
  {
    name: "Karim B.",
    role: "Saint-Raphaël",
    text: "20 minutes seulement et je sors épuisé… mais avec une énergie folle après. Idéal avec mon emploi du temps chargé.",
  },
  {
    name: "Élodie R.",
    role: "Puget-sur-Argens",
    text: "Le coaching nutrition Herbalife combiné aux séances EMS a tout changé pour moi. Résultats visibles, durables.",
  },
];

export const Testimonials = () => {
  return (
    <section id="avis" className="py-24 md:py-32 bg-gradient-dark text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container-px max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">Témoignages</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 mb-5">
            Ils ont <span className="text-gradient-accent">transformé leur quotidien</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="reveal bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="w-10 h-10 text-accent mb-4 opacity-80" />
              <p className="text-primary-foreground/90 leading-relaxed mb-6 text-lg">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">{r.name}</div>
                  <div className="text-sm text-primary-foreground/60">{r.role}</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-accent text-accent" />
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