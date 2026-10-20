
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

import smoothie from "@/assets/real-media/smoothie.webp";
import emsPoster from "@/assets/real-media/ems-poster.webp";
import affiche from "@/assets/real-media/affiche-transpire.webp";

import bienfaits from "@/assets/Snapchat-53536279.jpg";
import videoStudio from "@/assets/Snapchat-181987095.mp4";
import partage from "@/assets/Snapchat-437614151.jpg";
import pauseSmoothie from "@/assets/Snapchat-700469716.jpg";
import seanceEMS from "@/assets/Snapchat-934075019.jpg";
import smoothies from "@/assets/Snapchat-1100153276.jpg";
import petitDejeuner from "@/assets/Snapchat-1523835540.jpg";
import offres from "@/assets/Snapchat-1812147201.jpg";
import renforcementDos from "@/assets/Snapchat-2024363812.jpg";

type GalleryMedia = {
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
};

const imgs: GalleryMedia[] = [
  // 1. VRAIS CLIENTS ET MOMENTS AU STUDIO
  {
    src: partage,
    alt: "Moments de convivialité chez VitaFit Fréjus",
    type: "image",
  },
  {
    src: pauseSmoothie,
    alt: "Pause smoothie et bonne humeur chez VitaFit",
    type: "image",
  },
  {
    src: smoothies,
    alt: "Des sourires et des smoothies chez VitaFit",
    type: "image",
  },

  // 2. VIDÉO DU STUDIO - 20 SECONDES
  {
    src: videoStudio,
    alt: "Découvrez l'univers VitaFit Fréjus en vidéo",
    type: "video",
    poster: partage,
  },

  // 3. EMS ET ACCOMPAGNEMENT
  {
    src: renforcementDos,
    alt: "Coaching personnalisé et renforcement du dos",
    type: "image",
  },
  {
    src: bienfaits,
    alt: "Les bienfaits de l'EMS chez VitaFit",
    type: "image",
  },
  {
    src: seanceEMS,
    alt: "Séance EMS de 25 minutes chez VitaFit",
    type: "image",
  },

  // 4. NUTRITION ET OFFRES
  {
    src: petitDejeuner,
    alt: "Petit-déjeuner Vitalité VitaFit Fréjus",
    type: "image",
  },
  {
    src: offres,
    alt: "Séances EMS et smoothies protéinés VitaFit",
    type: "image",
  },

  // 5. ANCIENS VISUELS GÉNÉRIQUES
  {
    src: smoothie,
    alt: "Bar à smoothies VitaFit Fréjus Plage",
    type: "image",
  },
  {
    src: affiche,
    alt: "Affiche VitaFit - EMS et drainage",
    type: "image",
  },
  {
    src: emsPoster,
    alt: "Séance EMS 25 minutes VitaFit",
    type: "image",
  },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] =
    useState<GalleryMedia | null>(null);

  return (
    <section
      id="galerie"
      className="py-12 md:py-20 bg-background"
    >
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

        {/* Galerie en colonnes - aucun recadrage */}
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
                // Miniature personnalisée de la vidéo
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-muted">
                  <img
                    src={im.poster}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl transition-transform group-hover:scale-110">
                      <Play
                        className="h-7 w-7 ml-1"
                        fill="currentColor"
                      />
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-left">
                    <span className="text-white text-sm md:text-lg font-bold">
                      Découvrez VitaFit en vidéo
                    </span>
                    <p className="text-white/80 text-xs mt-1">
                      Appuyez pour regarder
                    </p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Agrandissement des images et vidéos */}
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

          {selectedImage &&
            (selectedImage.type === "video" ? (
              <video
                key={selectedImage.src}
                src={selectedImage.src}
                poster={selectedImage.poster}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[calc(100dvh-8rem)] object-contain rounded-lg bg-black"
              >
                Votre navigateur ne prend pas en charge
                la lecture de cette vidéo.
              </video>
            ) : (
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[calc(100dvh-8rem)] object-contain rounded-lg"
              />
            ))}
        </DialogContent>
      </Dialog>
    </section>
  );
};
