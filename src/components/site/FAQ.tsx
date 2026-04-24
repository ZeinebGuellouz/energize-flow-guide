import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "L'EMS est-elle adaptée à tout le monde ?",
    a: "Oui, l'électrostimulation EMS s'adapte à tous les niveaux : débutants, sportifs, seniors, personnes en rééducation. Un bilan préalable est réalisé avec votre coach. Quelques contre-indications existent (grossesse, pacemaker), nous en discutons ensemble.",
  },
  {
    q: "À quelle fréquence dois-je venir ?",
    a: "Une séance d'EMS par semaine suffit pour obtenir des résultats visibles. Le corps a besoin de 5 à 7 jours pour récupérer pleinement de la stimulation profonde.",
  },
  {
    q: "Quand vais-je voir les premiers résultats ?",
    a: "Les premières sensations (tonicité, énergie) apparaissent dès la 2e séance. Les résultats visibles sur la silhouette s'observent généralement entre la 4e et la 6e séance.",
  },
  {
    q: "Comment se passe la séance découverte offerte ?",
    a: "Vous venez à 2 (vous + un·e ami·e), nous vous accueillons, prenons le temps d'un bilan, vous équipons et vous faites une séance complète de 20 min. Aucune obligation d'achat ensuite.",
  },
  {
    q: "Est-ce que je transpire beaucoup ?",
    a: "Oui, l'EMS est très intense. Nous vous fournissons une combinaison technique. Prévoyez simplement de quoi vous changer.",
  },
  {
    q: "Puis-je combiner EMS et nutrition Herbalife ?",
    a: "Absolument, c'est même notre approche complète. Nous vous accompagnons sur l'aspect nutrition pour maximiser vos résultats : perte de poids, prise de masse ou bien-être général.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-12 md:py-32 bg-gradient-soft">
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