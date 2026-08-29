/**
 * Configuration des créneaux VitaFit.
 * Lundi → Vendredi : 08h00 – 18h00
 * Samedi          : 08h00 – 13h00
 * Dimanche        : fermé
 * Séances de 30 min, créneaux toutes les 15 min.
 */
export const TIMEZONE = "Europe/Paris";
export const STEP_MINUTES = 15;
export const SESSION_MINUTES = 30;
/** Durée de blocage d'un créneau pendant le paiement (minutes). */
export const HOLD_MINUTES = 20;

/** Heures d'ouverture par jour de la semaine (0 = dimanche). null = fermé. */
export const OPENING_HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 8, close: 18 },
  2: { open: 8, close: 18 },
  3: { open: 8, close: 18 },
  4: { open: 8, close: 18 },
  5: { open: 8, close: 18 },
  6: { open: 8, close: 13 },
};

function tzOffsetMs(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(date).filter((p) => p.type !== "literal").map((p) => [p.type, Number(p.value)])
  ) as Record<string, number>;
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour === 24 ? 0 : parts.hour,
    parts.minute,
    parts.second
  );
  return asUtc - date.getTime();
}

/** Convertit "2026-09-01" + "08:15" (heure de Paris) en Date UTC. */
export function parisToUtc(dateStr: string, timeStr: string): Date {
  const naive = Date.parse(`${dateStr}T${timeStr}:00Z`);
  let result = new Date(naive);
  for (let i = 0; i < 3; i++) {
    result = new Date(naive - tzOffsetMs(result, TIMEZONE));
  }
  return result;
}

/** Jour de la semaine (0 = dimanche) d'une date "YYYY-MM-DD". */
export function weekdayOf(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function isValidDateStr(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !Number.isNaN(Date.parse(`${dateStr}T00:00:00Z`));
}

export function isClosedOn(dateStr: string): boolean {
  return OPENING_HOURS[weekdayOf(dateStr)] == null;
}

/** Liste des heures théoriques pour une date donnée. */
export function dayTimes(dateStr: string): string[] {
  const hours = OPENING_HOURS[weekdayOf(dateStr)];
  if (!hours) return [];
  const times: string[] = [];
  const lastStart = hours.close * 60 - SESSION_MINUTES;
  for (let m = hours.open * 60; m <= lastStart; m += STEP_MINUTES) {
    times.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return times;
}

export type Slot = { time: string; startAt: string; endAt: string; available: boolean };

export function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}
