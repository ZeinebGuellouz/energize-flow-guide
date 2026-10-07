import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import smoothie from "@/assets/real-media/smoothie.webp";
import emsPoster from "@/assets/real-media/ems-poster.webp";
import affiche from "@/assets/real-media/affiche-transpire.webp";

const imgs = [
  { src: smoothie, alt: "Bar à smoothies VitaFit Fréjus Plage — un smoothie, un sourire, un moment à partager" },
  { src: affiche, alt: "Affiche VitaFit : séance EMS 25 min + drainage, studio Fréjus Plage" },
  { src: emsPoster, alt: "Séance EMS 25 minutes pour vous — électrostimulation et coaching à Fréjus Plage" },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof imgs)[number] | null>(null);

  return (
    <section id="galerie" className="py-12 md:py-20 bg-background">
      <div className="container-px max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">Galerie</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 leading-tight">
            Bienvenue dans <span className="text-gradient-accent">notre studio</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {imgs.map((im) => (
            <Button
              key={im.src}
              variant="ghost"
              className="h-auto w-full aspect-[9/16] overflow-hidden rounded-lg border border-border bg-muted p-0 hover:bg-muted focus-visible:ring-offset-2"
              aria-label={`Agrandir : ${im.alt}`}
              onClick={() => setSelectedImage(im)}
            >
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </Button>
          ))}
        </div>
      </div>
      <Dialog open={selectedImage !== null} onOpenChange={(open) => { if (!open) setSelectedImage(null); }}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-5xl rounded-lg p-3 pt-12" aria-describedby={undefined}>
          <DialogTitle className="sr-only">{selectedImage?.alt ?? "Photo VitaFit"}</DialogTitle>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[calc(100dvh-8rem)] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};