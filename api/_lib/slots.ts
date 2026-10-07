/** Configuration des créneaux VitaFit — lundi au samedi, 08:00 → 18:00, pas de 15 min. */
export const TIMEZONE = "Europe/Paris";
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 18;
export const STEP_MINUTES = 15;
export const SESSION_MINUTES = 25;
/** Durée de blocage d'un créneau pendant le paiement (minutes). */
export const HOLD_MINUTES = 20;

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

/** Jour de la semaine (0 = dimanche) d'une date "YYYY-MM-DD" à Paris. */
export function weekdayOf(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function isValidDateStr(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !Number.isNaN(Date.parse(`${dateStr}T00:00:00Z`));
}

/** Liste des heures théoriques d'une journée ouvrée. */
export function dayTimes(): string[] {
  const times: string[] = [];
  const lastStart = CLOSE_HOUR * 60 - SESSION_MINUTES;
  for (let m = OPEN_HOUR * 60; m <= lastStart; m += STEP_MINUTES) {
    times.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return times;
}

export type Slot = { time: string; startAt: string; endAt: string; available: boolean };

export function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}
