export const SITE = {
  name: "VitaFit Fréjus Plage",
  shortName: "VitaFit",
  phone: "06.98.89.04.01",
  phoneIntl: "+33698890401",
  whatsapp: "33698890401",
  email: "zeineb.guellouz@medtech.tn",
  address: "114 Rue Victor Reybaud, 83600 Fréjus Plage",
  addressLine1: "114 Rue Victor Reybaud",
  addressLine2: "",
  postalCode: "83600",
  city: "Fréjus Plage",
  hours: [
    { day: "Lundi - Vendredi", time: "9h00 - 20h00" },
    { day: "Samedi", time: "9h00 - 13h00" },
    { day: "Dimanche", time: "Fermé" },
  ],
  mapsEmbed:
    "https://www.google.com/maps?q=114+Rue+Victor+Reybaud+83600+Fr%C3%A9jus+Plage&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=114+Rue+Victor+Reybaud+83600+Fr%C3%A9jus+Plage",
};

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};