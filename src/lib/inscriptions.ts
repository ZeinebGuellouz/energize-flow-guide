import { supabase } from "@/integrations/supabase/client";

export type InscriptionStatus = "pending" | "confirmed" | "cancelled";

export const STATUS_LABELS: Record<InscriptionStatus, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Annulée",
};

export interface InscriptionLike {
  id: string;
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  telephone?: string | null;
  code_postal?: string | null;
  date_rdv?: string | null;
  creneau?: string | null;
}

const REQUIRED: [keyof InscriptionLike, string][] = [
  ["nom", "Nom"],
  ["prenom", "Prénom"],
  ["email", "Email"],
  ["telephone", "Téléphone"],
  ["date_rdv", "Date RDV"],
  ["creneau", "Créneau"],
];

const normPhone = (p?: string | null) => (p ?? "").replace(/\D/g, "").replace(/^33/, "0");

/** Lists missing or clearly invalid fields. */
export function missingFields(r: InscriptionLike): string[] {
  const out = REQUIRED.filter(([k]) => !String(r[k] ?? "").trim()).map(([, l]) => l);
  const phone = normPhone(r.telephone);
  if (phone && !/^0[1-9]\d{8}$/.test(phone)) out.push("Téléphone invalide");
  if (r.email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(r.email)) out.push("Email invalide");
  return out;
}

/**
 * Potential duplicates: same phone, or same full name.
 * Shared emails alone are NOT flagged (one person often books for several friends).
 */
export function duplicateIds(rows: InscriptionLike[]): Set<string> {
  const groups = new Map<string, string[]>();
  const add = (key: string, id: string) => {
    if (!key) return;
    groups.set(key, [...(groups.get(key) ?? []), id]);
  };
  for (const r of rows) {
    add("p:" + normPhone(r.telephone), r.id);
    const name = `${r.prenom ?? ""} ${r.nom ?? ""}`.trim().toLowerCase();
    if (name) add("n:" + name, r.id);
  }
  const dup = new Set<string>();
  for (const [key, ids] of groups) if (key !== "p:" && ids.length > 1) ids.forEach((i) => dup.add(i));
  return dup;
}

/** Saves a website submission. Never throws: the EmailJS notification must still go out. */
export async function saveInscription(source: "decouverte" | "demande_ems", d: Record<string, any>) {
  try {
    const { error } = await supabase.from("inscriptions").insert({
      source,
      civilite: d.civilite ?? null,
      nom: d.nom ?? null,
      prenom: d.prenom ?? null,
      email: d.email ?? d.from_email ?? null,
      telephone: d.mobile ?? d.telephone ?? null,
      code_postal: d.code_postal ?? null,
      invite_par: d.invite_par ?? null,
      date_rdv: d.date ?? null,
      creneau: d.creneau ?? null,
      objectif: d.objectif ?? null,
      formule: d.formule ?? null,
      message: d.message ?? null,
      sms_accepte: d.sms_accepte ?? null,
    });
    if (error) console.error("Inscription non enregistrée:", error.message);
  } catch (e) {
    console.error("Inscription non enregistrée:", e);
  }
}
