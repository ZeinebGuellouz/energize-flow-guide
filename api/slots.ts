import { getAdminDb } from "./_lib/supabase";
import { errorJson, json } from "./_lib/env";
import {
  SESSION_MINUTES,
  dayTimes,
  isClosedOn,
  isValidDateStr,
  overlaps,
  parisToUtc,
  type Slot,
} from "./_lib/slots";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") return errorJson("Method not allowed", 405);

  const url = new URL(req.url, "http://localhost");
  const date = url.searchParams.get("date") || "";
  if (!isValidDateStr(date)) return errorJson("Paramètre 'date' invalide (YYYY-MM-DD)", 400);

  // Jour de fermeture (dimanche)
  if (isClosedOn(date)) return json({ date, closed: true, slots: [] as Slot[] });

  const dayStart = parisToUtc(date, "00:00");
  const dayEnd = new Date(dayStart.getTime() + 36 * 60 * 60 * 1000);


  const db = getAdminDb();
  const nowIso = new Date().toISOString();

  const [bookingsRes, blockedRes] = await Promise.all([
    db
      .from("bookings")
      .select("start_at, end_at, status, hold_expires_at")
      .gte("start_at", dayStart.toISOString())
      .lt("start_at", dayEnd.toISOString())
      .in("status", ["paid", "pending"]),
    db
      .from("blocked_slots")
      .select("start_at, end_at")
      .lt("start_at", dayEnd.toISOString())
      .gt("end_at", dayStart.toISOString()),
  ]);

  if (bookingsRes.error) return errorJson(bookingsRes.error.message, 500);
  if (blockedRes.error) return errorJson(blockedRes.error.message, 500);

  const busy: Array<[number, number]> = [];
  for (const b of bookingsRes.data ?? []) {
    const active = b.status === "paid" || (b.hold_expires_at && b.hold_expires_at > nowIso);
    if (!active) continue;
    busy.push([Date.parse(b.start_at), Date.parse(b.end_at)]);
  }
  for (const b of blockedRes.data ?? []) busy.push([Date.parse(b.start_at), Date.parse(b.end_at)]);

  const minStart = Date.now() + 60 * 60 * 1000; // pas de réservation dans l'heure qui vient

  const slots: Slot[] = dayTimes(date).map((time) => {
    const start = parisToUtc(date, time);
    const end = new Date(start.getTime() + SESSION_MINUTES * 60 * 1000);
    const conflict = busy.some(([s, e]) => overlaps(start.getTime(), end.getTime(), s, e));
    return {
      time,
      startAt: start.toISOString(),
      endAt: end.toISOString(),
      available: !conflict && start.getTime() > minStart,
    };
  });

  return json({ date, closed: false, slots });
}
