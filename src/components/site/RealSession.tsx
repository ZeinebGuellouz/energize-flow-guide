import { useEffect, useRef, useState } from "react";
import equipePhoto from "@/assets/real-media/equipe-vitafit.webp";
import affichePhoto from "@/assets/real-media/affiche-transpire.webp";
import seanceVideo from "@/assets/real-media/seance-coaching.webm";
import seancePoster from "@/assets/real-media/seance-poster.webp";

function StudioVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="aspect-[9/16] w-full rounded-2xl bg-muted object-cover sm:rounded-3xl"
      poster={seancePoster}
      src={started ? seanceVideo : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Séance EMS filmée au studio VitaFit de Fréjus Plage"
    />
  );
}

export const RealSession = () => (
  <section className="bg-gradient-soft py-12 md:py-20">
    <div className="container-px mx-auto max-w-7xl">
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
        <img
          src={equipePhoto}
          alt="L'équipe VitaFit vous accueille dans son studio de Fréjus Plage"
          loading="lazy"
          width={900}
          height={1200}
          className="h-64 w-full rounded-2xl object-cover object-center sm:h-80 md:h-96"
        />
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">Accompagnement / Équipe</span>
          <h2 className="mt-3 text-2xl font-black leading-tight text-foreground sm:text-4xl">À vos côtés, à chaque séance</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">Un accompagnement attentif, des mouvements adaptés à votre rythme et l'énergie d'un vrai studio de proximité à Fréjus Plage.</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl md:mt-20">
        <h2 className="mb-6 text-center text-2xl font-black text-foreground sm:text-4xl">Découvrez une séance en vrai</h2>
        <div className="grid gap-4 sm:grid-cols-5 sm:items-center sm:gap-6">
          <div className="sm:col-span-3">
            <StudioVideo />
          </div>
          <figure className="sm:col-span-2">
            <img
              src={affichePhoto}
              alt="Affiche VitaFit : séance EMS 25 min + drainage, studio Fréjus Plage"
              loading="lazy"
              width={760}
              height={1350}
              className="aspect-[9/16] w-full rounded-2xl object-cover sm:rounded-3xl"
            />
            <figcaption className="mt-2 text-center text-sm font-semibold text-foreground">L'ambiance du studio, en images</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
);
