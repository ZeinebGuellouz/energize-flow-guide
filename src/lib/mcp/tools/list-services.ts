import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  {
    id: "ems",
    name: "Électrostimulation musculaire (EMS)",
    duration_minutes: 20,
    description:
      "Séance encadrée par un coach avec combinaison EMS activant jusqu'à 350 muscles. Idéal pour perte de poids, tonification et remise en forme.",
  },
  {
    id: "coaching",
    name: "Coaching personnalisé",
    description:
      "Bilan initial, suivi de progression et objectifs adaptés (perte de poids, prise de masse, remise en forme).",
  },
  {
    id: "nutrition",
    name: "Nutrition & accompagnement",
    description:
      "Programmes nutritionnels, bar à smoothies et conseils pour maximiser les résultats et la récupération.",
  },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "Return the services offered by VitaFit Fréjus Plage: EMS, coaching, nutrition.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});
