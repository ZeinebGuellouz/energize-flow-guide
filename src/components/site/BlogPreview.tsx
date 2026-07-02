import { Link } from "react-router-dom";
import { getPublishedArticles } from "@/content/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const BlogPreview = () => {
  const articles = getPublishedArticles().slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-px max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">
              Blog
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-2">
              Derniers <span className="text-gradient-accent">articles</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
          >
            Tous les articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="reveal group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all border border-border"
            >
              <Link to={`/blog/${a.slug}`} className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={a.cover}
                    alt={a.coverAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(a.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {a.readingMinutes} min
                  </span>
                </div>
                <h3 className="text-lg font-black leading-tight mb-2">
                  <Link
                    to={`/blog/${a.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {a.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {a.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
