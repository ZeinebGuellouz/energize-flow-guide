import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  
  {
    q: "Quand vais-je voir les premiers résultats ?",
    a: "La plupart de nos clients ressentent une meilleure tonicité et plus d'énergie dès les premières séances. Les résultats visibles apparaissent généralement après 4 à 6 séances selon vos objectifs et votre régularité.",
  },
  {
    q: "L'EMS est-elle adaptée aux débutants ?",
    a: "Oui. L'intensité est entièrement personnalisée. Que vous soyez débutant, sportif confirmé ou en reprise d'activité, la séance est adaptée à votre niveau.",
  },
  {
    q: "Combien de séances par semaine sont recommandées ?",
    a: "Une à deux séances par semaine sont généralement recommandées pour obtenir des résultats optimaux. Votre coach adaptera la fréquence en fonction de vos objectifs, de votre niveau et de votre disponibilité.",
  },
  
  {
    q: "Faut-il être en bonne condition physique pour commencer ?",
    a: "Non. L'EMS convient à différents profils et permet de travailler efficacement même si vous manquez de temps ou reprenez une activité sportive.",
  },
  {
    q: "Puis-je associer EMS et accompagnement nutritionnel ?",
    a: "Oui. Nous proposons un accompagnement nutritionnel et un bar à smoothies afin d'optimiser vos résultats, votre récupération et votre bien-être global.",
  },
  {
    q: "Dois-je apporter quelque chose pour ma séance ?",
    a: "Non. Nous fournissons la tenue EMS et l’équipement nécessaire. Pensez simplement à apporter une paire de baskets et à bien vous hydrater avant votre séance..",
  },
];
export const FAQ = () => {
  return (
    <section id="faq" className="py-12 md:py-20 bg-gradient-soft">
      <div className="container-px max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 leading-tight">Questions fréquentes</h2>
        </div>
        <Accordion type="single" collapsible className="reveal space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card rounded-2xl border border-border shadow-soft px-4 sm:px-6 data-[state=open]:shadow-elevated transition-shadow"
            >
              <AccordionTrigger className="text-left font-bold text-sm sm:text-base md:text-lg hover:no-underline py-4 sm:py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
