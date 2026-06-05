import { Quote, Star } from "lucide-react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=88d66a416da09828&sxsrf=ANbL-n5ycST_8UECStSP_BQWNNJL9BrqUg:1780581163081&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaJDE5uxAhXfUt1FXB_Vu4xYlVfKTF5DYb6BqSHApHHxmx2GQy8TmhclecJ3n80l3jyjHbbq-IFnx9ur01fPhmBxXxaKjzDM-BaiKeeCI3skRUzyMw%3D%3D&q=Studio+d%E2%80%99Electro-Stimulation+Reviews&sa=X&ved=2ahUKEwi1k-Dd3e2UAxXszgIHHU2lMPwQ0bkNegQIIhAH";

const reviews = [
  {
    name: "René Barsi",
    role: "Avis Google",
    text: "À 80 ans, cela fait maintenant deux ans que je fréquente cette salle. Le concept avec les combinaisons à électrodes est innovant, très bien encadré et adapté à chacun. Une expérience extrêmement positive que je recommande à tout âge.",
  },
  {
    name: "Jacques Grandmaison",
    role: "Avis Google",
    text: "Accueil très chaleureux, bienveillant, amical et gai. Après quelques semaines, on sent que les muscles réapparaissent et que le corps est mieux soutenu. Après une séance, on se sent léger, heureux et serein.",
  },
  {
    name: "Solène Riou",
    role: "Avis Google",
    text: "Ravie des résultats obtenus au bout d’un peu plus d’un an ! Tonicité, fermeté et silhouette transformée. L’ambiance est super à chaque séance et les conseils nutrition font toute la différence.",
  },
  {
    name: "Noémie Kleiber",
    role: "Avis Google",
    text: "Excellente expérience avec Monia au studio. Son accompagnement est professionnel, motivant et très personnalisé. Dès les premières semaines, j’ai ressenti un corps plus tonique, plus ferme et une silhouette qui se redessine.",
  },
  {
    name: "Serge Dewaele",
    role: "Avis Google",
    text: "Je recommande fortement ce centre. L’équipe est très professionnelle, conviviale et à l’écoute. Les séances sont encadrées dans une ambiance familiale, chaleureuse et toujours dans la bonne humeur.",
  },
  {
    name: "Yanis Barriol",
    role: "Avis Google",
    text: "Une expérience très intéressante et efficace. Les sensations sont intenses mais bien maîtrisées. On sent clairement les muscles travailler en profondeur, avec une sensation de légèreté et de tonicité après la séance.",
  },
  {
    name: "Alain Pradines",
    role: "Avis Google",
    text: "L’électro-stimulation : l’essayer, c’est l’adopter. Je ne peux plus m’en passer. Très bon travail musculaire sans courbature, avec une équipe aux petits soins dans une ambiance sympathique.",
  },
  {
    name: "Patricia To",
    role: "Avis Google",
    text: "Soucieuse de notre bien-être, l’équipe nous accompagne avec le sourire et la bonne humeur. J’ai trouvé ma peau raffermie et j’ai perdu au niveau des bras au bout de quelques mois.",
  },
  {
    name: "Fabienne Wyss",
    role: "Avis Google",
    text: "Monia est aux petits soins, toujours dans la bienveillance. Les progrès et les effets sont rapides, un vrai plaisir. Des séances où l’on ressort revigoré.",
  },
  {
    name: "Jean Yves Morvan",
    role: "Avis Google",
    text: "Une équipe professionnelle, souriante, respectueuse et dynamique. Une très belle expérience que je conseille à tous. Prendre soin de soi est primordial, et une séance gratuite permet de tester sans engagement.",
  },
  {
    name: "BY FAT",
    role: "Avis Google",
    text: "Monia et son équipe coachent très bien, toujours avec le sourire et la bonne humeur. Le programme est personnalisé avec un suivi régulier. Les résultats sont visibles et je me sens mieux dans ma peau.",
  },
  {
    name: "Nicole Miry",
    role: "Avis Google",
    text: "À 73 ans et sportive, j’ai fait un essai très concluant. C’est une excellente façon de se tonifier. L’accueil est chaleureux et la récupération est vraiment bienvenue.",
  },
];
const repeatedReviews = [...reviews, ...reviews, ...reviews];

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
                className="min-w-[320px] max-w-[320px] sm:min-w-[360px] sm:max-w-[360px] md:min-w-[420px] md:max-w-[420px] min-h-[420px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500"
              >
                <div className="flex flex-col h-full">
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-accent mb-5 opacity-80" />

                  <p className="text-primary-foreground/90 leading-loose text-base flex-1">
                    "{r.text}"
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                    <div>
                      <div className="font-bold text-base md:text-lg">
                        {r.name}
                      </div>

                      <div className="text-sm text-primary-foreground/60">
                        {r.role}
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, k) => (
                        <Star
                          key={k}
                          className="w-4 h-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
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
