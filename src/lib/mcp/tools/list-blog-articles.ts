import { defineTool } from "@lovable.dev/mcp-js";

// Static index to keep the MCP entry import-safe (no React/asset imports at server eval).
const ARTICLES = [
  {
    slug: "ems-ou-salle-de-sport",
    title: "EMS ou salle de sport classique : que choisir à Fréjus ?",
    keyword: "ems ou salle de sport",
    date: "2026-06-15",
    url: "https://www.vitafit-frejus.fr/blog/ems-ou-salle-de-sport",
  },
  {
    slug: "perte-de-poids-ems-frejus",
    title: "Perte de poids avec l'EMS à Fréjus : comment ça marche vraiment",
    keyword: "perte de poids ems",
    date: "2026-06-20",
    url: "https://www.vitafit-frejus.fr/blog/perte-de-poids-ems-frejus",
  },
  {
    slug: "nutrition-sportive-recuperation",
    title: "Nutrition sportive et récupération : les bases pour progresser",
    keyword: "nutrition sportive récupération",
    date: "2026-06-25",
    url: "https://www.vitafit-frejus.fr/blog/nutrition-sportive-recuperation",
  },
];

export default defineTool({
  name: "list_blog_articles",
  title: "List blog articles",
  description:
    "Return the list of published VitaFit blog articles with title, slug, date and canonical URL.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(ARTICLES, null, 2) }],
    structuredContent: { articles: ARTICLES },
  }),
});
