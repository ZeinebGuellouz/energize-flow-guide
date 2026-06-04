export const SITE = {
  name: "Espace Nutri-Forme Fréjus Plage",
  shortName: "Nutri-Forme",
  phone: "06.98.89.04.01",
  phoneIntl: "+33698890401",
  whatsapp: "33698890401",
  email: "zeineb.guellouz@medtech.tn",
  address: "194 Rue de la République, 83600 Fréjus",
  addressLine1: "194 Rue de la République",
  addressLine2: "",
  postalCode: "83600",
  city: "Fréjus",
  hours: [
    { day: "Lundi - Vendredi", time: "9h00 - 20h00" },
    { day: "Samedi", time: "9h00 - 13h00" },
    { day: "Dimanche", time: "Fermé" },
  ],
  mapsEmbed:
    "https://www.google.com/maps?q=194+Rue+de+la+R%C3%A9publique+83600+Fr%C3%A9jus&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=194+Rue+de+la+R%C3%A9publique+83600+Fr%C3%A9jus",
};

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};