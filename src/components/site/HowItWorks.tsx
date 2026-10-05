import emsPhoto from "@/assets/real-media/femme-seance-ems.webp";
import coachImg from "@/assets/coach-session.jpg";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/site";

const steps = [
  { n: "01", title: "Accueil & bilan", text: "Votre coach analyse vos objectifs, votre forme et personnalise votre programme." },
  { n: "02", title: "Mise en tenue EMS", text: "Vous enfilez la combinaison connectée, confort optimal, électrodes humidifiées." },
  { n: "03", title: "20 min d'entraînement", text: "Mouvements simples guidés par votre coach, intensité ajustée en temps réel." },
  { n: "04", title: "Étirements & conseils", text: "Récupération active et conseils nutrition pour prolonger les bénéfices." },
];

export const HowItWorks = () => {
  return (
    <section id="seance" className="py-12 md:py-20 bg-background">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          <div className="reveal-left order-2 lg:order-1">
            <div className="relative">
              <img
                src={emsPhoto}
                alt="Une cliente VitaFit s'entraîne en combinaison EMS dans le studio de Fréjus Plage"
                loading="lazy"
                width={850}
                height={1133}
                className="rounded-3xl shadow-elevated w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block w-48 h-48 rounded-3xl overflow-hidden shadow-glow border-4 border-background">
                <img src={coachImg} alt="Coach EMS Fréjus" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-accent text-accent-foreground px-3 py-2 sm:px-5 sm:py-3 rounded-2xl shadow-glow font-bold text-sm sm:text-base">
                20 min · 350 muscles
              </div>
            </div>
          </div>

          <div className="reveal-right order-1 lg:order-2">
            <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">Comment ça marche ?</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 md:mb-6 leading-tight">
              Une séance <span className="text-gradient-accent">simple, intense, encadrée</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10">
              Une séance EMS chez VitaFit dure 20 minutes effectives, toujours encadrée par un coach
              certifié. Pas besoin d'expérience sportive : la technologie s'adapte à vous.
            </p>

            <ol className="space-y-5 md:space-y-6 mb-8 md:mb-10">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4 sm:gap-5">
                  <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-secondary grid place-items-center font-black text-accent text-base sm:text-lg">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-1">{s.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={() => scrollToId("decouverte")}>
              Réserver avec -50%
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};