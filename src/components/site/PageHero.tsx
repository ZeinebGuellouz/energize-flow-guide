import { ReactNode } from "react";

export const PageHero = ({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-dark text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container-px max-w-5xl mx-auto relative text-center animate-fade-in">
        {eyebrow && (
          <span className="text-accent font-semibold uppercase tracking-widest text-sm">{eyebrow}</span>
        )}
        <h1 className="text-4xl md:text-6xl font-black mt-3 mb-5 leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};