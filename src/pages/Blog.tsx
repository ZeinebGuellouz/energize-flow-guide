import { Link } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { getPublishedArticles } from "@/content/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const SITE_URL = "https://www.vitafit-frejus.fr";

const Blog = () => {
  const articles = getPublishedArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog VitaFit Fréjus Plage",
    url: `${SITE_URL}/blog`,
    description:
      "Conseils EMS, perte de poids, nutrition sportive et remise en forme à Fréjus Plage.",
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/blog/${a.slug}`,
      datePublished: a.date,
      author: { "@type": "Organization", name: a.author },
    })),
  };

  return (
    <Layout>
      <SEO
        title="Blog EMS, perte de poids & nutrition | VitaFit Fréjus Plage"
        description="Conseils EMS, perte de poids, nutrition sportive et remise en forme à Fréjus Plage. Le blog du studio VitaFit."
        path="/blog"
        jsonLd={jsonLd}
      />

      <PageHero
        eyebrow="Blog"
        title={
          <>
            Conseils EMS,{" "}
            <span className="text-gradient-accent">nutrition & remise en forme</span>
          </>
        }
        subtitle="Nos articles pratiques pour progresser à votre rythme, à Fréjus Plage."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container-px max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {a.readingMinutes} min
                  </span>
                </div>
                <h2 className="text-xl font-black leading-tight mb-2">
                  <Link
                    to={`/blog/${a.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {a.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground mb-4">{a.excerpt}</p>
                <Link
                  to={`/blog/${a.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
                >
                  Lire l'article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
