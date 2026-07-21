import { defineTool } from "@lovable.dev/mcp-js";

const PACKS = [
  {
    id: "decouverte",
    name: "Séance découverte",
    price_eur: 19.5,
    original_price_eur: 39,
    note: "Offre -50% sur la 1ère séance",
    includes: ["Bilan personnalisé", "1 séance EMS de 20 min", "Combinaison fournie", "Sans engagement"],
  },
  {
    id: "seance1",
    name: "1 séance",
    price_eur: 39,
    note: "Séance unique",
    includes: ["1 séance EMS de 20 min", "Coach personnel", "Accès au bar à smoothies"],
  },
  {
    id: "pack5",
    name: "Pack 5 séances",
    price_eur: 185,
    per_session_eur: 37,
    includes: ["5 séances EMS de 20 min", "Coach personnel", "Suivi de progression"],
  },
  {
    id: "pack10",
    name: "Pack 10 séances",
    price_eur: 315,
    per_session_eur: 31.5,
    includes: ["10 séances EMS de 20 min", "Bilan complet + suivi", "Réductions partenaires"],
  },
  {
    id: "pack20",
    name: "Pack 20 séances",
    price_eur: 560,
    per_session_eur: 28,
    includes: ["20 séances EMS de 20 min"],
  },
];

export default defineTool({
  name: "list_pricing",
  title: "List EMS pricing",
  description:
    "Return VitaFit's EMS session packs and pricing (discovery offer, single sessions, 5/10/20 packs).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PACKS, null, 2) }],
    structuredContent: { packs: PACKS, currency: "EUR" },
  }),
});
