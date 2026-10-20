
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import smoothie from "@/assets/real-media/smoothie.webp";
import emsPoster from "@/assets/real-media/ems-poster.webp";
import affiche from "@/assets/real-media/affiche-transpire.webp";

import bienfaits from "@/assets/real-media/Snapchat-53536279.jpg";
import video1 from "@/assets/real-media/Snapchat-181987095.mp4";
import partage from "@/assets/real-media/Snapchat-437614151.jpg";
import pauseSmoothie from "@/assets/real-media/Snapchat-700469716.jpg";
import seanceEMS from "@/assets/real-media/Snapchat-934075019.jpg";
import smoothies from "@/assets/real-media/Snapchat-1100153276.jpg";
import petitDejeuner from "@/assets/real-media/Snapchat-1523835540.jpg";
import offres from "@/assets/real-media/Snapchat-1812147201.jpg";
import sportSourires from "@/assets/real-media/Snapchat-1933399201.jpg";
import video2 from "@/assets/real-media/Snapchat-1980604965.mp4";
import renforcementDos from "@/assets/real-media/Snapchat-2024363812.jpg";

type GalleryMedia = {
  src: string;
  alt: string;
  type: "image" | "video";
};

const imgs: GalleryMedia[] = [
  {
    src: sportSourires,
    alt: "VitaFit Fréjus - Sport et sourires",
    type: "image",
  },
  {
    src: renforcementDos,
    alt: "Renforcement du dos et coaching EMS VitaFit",
    type: "image",
  },
  {
    src: bienfaits,
    alt: "Les bienfaits de l'EMS chez VitaFit",
    type: "image",
  },
  {
    src: seanceEMS,
    alt: "Séance EMS de 25 minutes - VitaFit Fréjus",
    type: "image",
  },
  {
    src: partage,
    alt: "Le bonheur se partage - VitaFit",
    type: "image",
  },
  {
    src: pauseSmoothie,
    alt: "Pause smoothie VitaFit Fréjus",
    type: "image",
  },
  {
    src: smoothies,
    alt: "Smoothies fruits rouges et banane VitaFit",
    type: "image",
  },
  {
    src: petitDejeuner,
    alt: "Petit-déjeuner Vitalité VitaFit",
    type: "image",
  },
  {
    src: offres,
    alt: "Séances EMS et smoothies protéinés VitaFit",
    type: "image",
  },
  {
    src: smoothie,
    alt: "Bar à smoothies VitaFit Fréjus Plage",
    type: "image",
  },
  {
    src: affiche,
    alt: "Affiche VitaFit - séance EMS et drainage",
    type: "image",
  },
  {
    src: emsPoster,
    alt: "Séance EMS 25 minutes VitaFit",
    type: "image",
  },
  {
    src: video1,
    alt: "Vidéo VitaFit - découverte du studio",
    type: "video",
  },
  {
    src: video2,
    alt: "Vidéo VitaFit - activités du studio",
    type: "video",
  },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] =
    useState<GalleryMedia | null>(null);

  return (
    <section id="galerie" className="py-12 md:py-20 bg-background">
      <div className="container-px max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 reveal">
          <span className="text-accent font-semibold uppercase tracking-widest text-xs sm:text-sm">
            Galerie
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-4 leading-tight">
            Bienvenue dans{" "}
            <span className="text-gradient-accent">
              notre studio
            </span>
          </h2>

          <p className="text-muted-foreground">
            Découvrez notre univers, nos séances EMS
            et nos moments de convivialité.
          </p>
        </div>

        <div className="columns-2 lg:columns-3 gap-3 md:gap-5">
          {imgs.map((im) => (
            <button
              type="button"
              key={im.src}
              onClick={() => setSelectedImage(im)}
              aria-label={`Voir : ${im.alt}`}
              className="group relative mb-3 md:mb-5 block w-full break-inside-avoid overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {im.type === "image" ? (
                <img
                  src={im.src}
                  alt={im.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="relative bg-black">
                  <video
                    src={im.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block"
                    aria-label={im.alt}
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-lg">
                      ▶
                    </span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null);
        }}
      >
        <DialogContent
          className="w-[calc(100%-2rem)] max-w-5xl rounded-xl p-3 pt-12"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">
            {selectedImage?.alt ?? "Média VitaFit"}
          </DialogTitle>

          {selectedImage && (
            selectedImage.type === "video" ? (
              <video
                key={selectedImage.src}
                src={selectedImage.src}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[calc(100dvh-8rem)] object-contain rounded-lg"
              />
            ) : (
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[calc(100dvh-8rem)] object-contain rounded-lg"
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
