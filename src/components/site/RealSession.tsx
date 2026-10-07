import equipePhoto from "@/assets/real-media/equipe-vitafit.webp";

export const RealSession = () => (
  <section className="bg-gradient-soft py-12 md:py-20">
    <div className="container-px mx-auto max-w-7xl">
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">Accompagnement / Équipe</span>
          <h2 className="mt-3 text-2xl font-black leading-tight text-foreground sm:text-4xl">À vos côtés, à chaque séance</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">Un accompagnement attentif, des mouvements adaptés à votre rythme et l'énergie d'un vrai studio de proximité à Fréjus Plage.</p>
        </div>
        <img
          src={equipePhoto}
          alt="L'équipe VitaFit vous accueille dans son studio de Fréjus Plage"
          loading="lazy"
          width={900}
          height={1200}
          className="h-64 w-full rounded-2xl object-cover object-center sm:h-80 md:h-96"
        />
      </div>
    </div>
  </section>
);
