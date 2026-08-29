/**
 * Horaires d'ouverture VitaFit (partagés par tous les formulaires du site).
 * Lundi → Vendredi : 08h00 – 18h00
 * Samedi          : 08h00 – 13h00
 * Dimanche        : fermé
 * Séances de 30 min, créneaux toutes les 15 min.
 */
export const SESSION_MINUTES = 30;
export const STEP_MINUTES = 15;

export const OPENING_HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 8, close: 18 },
  2: { open: 8, close: 18 },
  3: { open: 8, close: 18 },
  4: { open: 8, close: 18 },
  5: { open: 8, close: 18 },
  6: { open: 8, close: 13 },
};

export const OPENING_LABEL = "Lun–Ven 8h–18h · Sam 8h–13h · Dimanche fermé";

export const weekdayOfDateStr = (dateStr: string): number => {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return -1;
  return new Date(y, m - 1, d).getDay();
};

export const isClosedDay = (dateStr: string): boolean => {
  const wd = weekdayOfDateStr(dateStr);
  if (wd < 0) return false;
  return OPENING_HOURS[wd] == null;
};

/** Créneaux disponibles pour une date "YYYY-MM-DD" (vide si fermé). */
export const timeSlotsFor = (dateStr: string): string[] => {
  const wd = weekdayOfDateStr(dateStr);
  const hours = wd >= 0 ? OPENING_HOURS[wd] : null;
  if (!hours) return [];
  const slots: string[] = [];
  const lastStart = hours.close * 60 - SESSION_MINUTES;
  for (let m = hours.open * 60; m <= lastStart; m += STEP_MINUTES) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return slots;
};
