import studio from "@/assets/studio-interior.jpg";
import equipe from "@/assets/real-media/equipe-vitafit.webp";
import seance from "@/assets/real-media/femme-seance-ems.webp";
import smoothie from "@/assets/real-media/smoothie.webp";
import emsPoster from "@/assets/real-media/ems-poster.webp";
import affiche from "@/assets/real-media/affiche-transpire.webp";

const imgs = [
  { src: studio, alt: "Studio EMS Fréjus Plage", h: "lg:row-span-2" },
  { src: equipe, alt: "L'équipe VitaFit dans le studio de Fréjus Plage" },
  { src: seance, alt: "Séance EMS réelle chez VitaFit Fréjus Plage", h: "lg:row-span-2" },
  { src: smoothie, alt: "Bar à smoothies VitaFit Fréjus Plage — un smoothie, un sourire, un moment à partager", h: "lg:row-span-2" },
  { src: affiche, alt: "Affiche VitaFit : séance EMS 25 min + drainage, studio Fréjus Plage" },
  { src: emsPoster, alt: "Séance EMS 25 minutes pour vous — électrostimulation et coaching à Fréjus Plage" },
];

export const Gallery = () => {
  return (
    <section id="galerie" className="py-12 md:py-20 bg-background">
      <div className="container-px max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">Galerie</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 leading-tight">
            Bienvenue dans <span className="text-gradient-accent">notre studio</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[140px] sm:auto-rows-[200px] md:auto-rows-[240px] gap-2 sm:gap-3 md:gap-4">
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