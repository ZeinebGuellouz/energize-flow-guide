import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Return VitaFit Fréjus Plage contact information: address, phone, email, opening hours, and map link.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "VitaFit Fréjus Plage",
      address: "114 Rue Victor Reybaud, 83600 Fréjus Plage, France",
      phone: "+33 6 98 89 04 01",
      whatsapp: "https://wa.me/33698890401",
      website: "https://www.vitafit-frejus.fr",
      hours: [
        { day: "Lundi - Vendredi", time: "9h00 - 20h00" },
        { day: "Samedi", time: "9h00 - 13h00" },
        { day: "Dimanche", time: "Fermé" },
      ],
      mapsLink:
        "https://www.google.com/maps/search/?api=1&query=114+Rue+Victor+Reybaud+83600+Fr%C3%A9jus+Plage",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
