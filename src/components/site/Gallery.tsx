import studio from "@/assets/studio-interior.jpg";
import coach from "@/assets/coach-session.jpg";
import ems from "@/assets/ems-suit.jpg";
import wl from "@/assets/benefit-weightloss.jpg";
import muscle from "@/assets/benefit-muscle.jpg";
import recov from "@/assets/benefit-recovery.jpg";

const imgs = [
  { src: studio, alt: "Studio EMS Fréjus Plage", h: "lg:row-span-2" },
  { src: coach, alt: "Coach personnel EMS" },
  { src: ems, alt: "Combinaison EMS" },
  { src: wl, alt: "Perte de poids EMS" },
  { src: muscle, alt: "Gain musculaire EMS", h: "lg:row-span-2" },
  { src: recov, alt: "Récupération musculaire" },
];

export const Gallery = () => {
  return (
    <section id="galerie" className="py-24 md:py-32 bg-background">
      <div className="container-px max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">Galerie</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 mb-5">
            Bienvenue dans <span className="text-gradient-accent">notre studio</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[180px] md:auto-rows-[240px] gap-3 md:gap-4">
          {imgs.map((im, i) => (
            <div
              key={i}
              className={`reveal overflow-hidden rounded-2xl group ${im.h ?? ""}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};