import { Link, Navigate, useParams } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { getArticleBySlug, getPublishedArticles } from "@/content/blog";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

const SITE_URL = "https://www.vitafit-frejus.fr";

const BlogArticle = () => {
  const { slug = "" } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const url = `${SITE_URL}/blog/${article.slug}`;
  const related = article.related
    .map((s) => getArticleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => !!a && !a.draft);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      inLanguage: "fr-FR",
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      author: { "@type": "Organization", name: article.author },
      publisher: {
        "@type": "Organization",
        name: "VitaFit Fréjus Plage",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/ChatGPT_Image_12_juin_2026__08_13_47-removebg-preview.png`,
        },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: article.keyword,
      image: [`${SITE_URL}${article.cover}`],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: SITE_URL + "/blog" },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  return (
    <Layout>
      <SEO
        title={article.seoTitle}
        description={article.description}
        path={`/blog/${article.slug}`}
        jsonLd={jsonLd}
        ogType="article"
        ogImage={`${SITE_URL}${article.cover}`}
        noindex={article.draft}
      />

      <article className="pt-10 md:pt-16 pb-16 md:pb-24 bg-background">
        <div className="container-px max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingMinutes} min de lecture
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            {article.title}
          </h1>

          <img
            src={article.cover}
            alt={article.coverAlt}
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-elevated mb-10"
            width={1600}
            height={900}
          />

          <div
            className="
              prose-article
              text-base md:text-lg text-foreground/90 leading-relaxed
              [&>p]:mb-5
              [&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:font-black [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-foreground
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul>li]:mb-2
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol>li]:mb-2
              [&_a]:text-accent [&_a]:font-semibold [&_a]:underline-offset-4 hover:[&_a]:underline
              [&_strong]:text-foreground
            "
          >
            {article.body}
          </div>

          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-soft border border-border">
            <h2 className="text-xl md:text-2xl font-black mb-2">
              Envie de tester la méthode VitaFit ?
            </h2>
            <p className="text-muted-foreground mb-4">
              Première séance à -50 %. Coaching, combinaison et bilan inclus.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tarifs"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Voir les tarifs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border text-foreground font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-14 md:py-20 bg-gradient-soft border-t border-border">
          <div className="container-px max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-8">
              À lire aussi
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all border border-border flex"
                >
                  <div className="w-32 sm:w-40 shrink-0 overflow-hidden">
                    <img
                      src={a.cover}
                      alt={a.coverAlt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-bold leading-snug mb-1 group-hover:text-accent transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {a.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogArticle;
