import { useEffect, useRef, useState } from "react";
import coachingPhoto from "@/assets/real-media/accompagnement.webp";
import coachingVideo from "@/assets/real-media/seance-coaching.mp4";
import coachingPoster from "@/assets/real-media/coaching-poster.webp";
import movementVideo from "@/assets/real-media/seance-mouvements.mp4";
import movementPoster from "@/assets/real-media/mouvements-poster.webp";

const clips = [
  { src: coachingVideo, poster: coachingPoster, title: "Coaching en studio" },
  { src: movementVideo, poster: movementPoster, title: "Mouvements en EMS" },
];

function SessionClip({ src, poster, title }: (typeof clips)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive(true);
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.3 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="min-w-0">
      <video
        ref={videoRef}
        className="aspect-[9/13] w-full rounded-2xl bg-muted object-cover"
        poster={poster}
        src={active ? src : undefined}
        muted
        loop
        playsInline
        controls
        preload="none"
        aria-label={title}
      />
      <figcaption className="mt-2 text-sm font-semibold text-foreground">{title}</figcaption>
    </figure>
  );
}

export const RealSession = () => (
  <section className="bg-gradient-soft py-12 md:py-20">
    <div className="container-px mx-auto max-w-7xl">
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
        <img
          src={coachingPhoto}
          alt="Une coach VitaFit accompagne une participante pendant une séance EMS à Fréjus"
          loading="lazy"
          width={480}
          height={832}
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
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {clips.map((clip) => <SessionClip key={clip.src} {...clip} />)}
        </div>
      </div>
    </div>
  </section>
);