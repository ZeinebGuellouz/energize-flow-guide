import { z } from "zod";
import { getAdminDb } from "./_lib/supabase";
import { getStripe, PRODUCTS } from "./_lib/stripe";
import { errorJson, json } from "./_lib/env";
import {
  HOLD_MINUTES,
  SESSION_MINUTES,
  dayTimes,
  isClosedOn,
  isValidDateStr,
  overlaps,
  parisToUtc,
} from "./_lib/slots";


const BodySchema = z.object({
  date: z.string().refine(isValidDateStr, "Date invalide"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Créneau invalide"),
  civilite: z.enum(["mme", "mr"]),
  nom: z.string().trim().min(2).max(60),
  prenom: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(150),
  telephone: z.string().trim().regex(/^[0-9 +.\-()]{8,20}$/, "Téléphone invalide"),
  codePostal: z.string().trim().regex(/^[0-9]{5}$/, "Code postal invalide"),
  message: z.string().trim().max(1000).optional(),
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return errorJson("Method not allowed", 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return errorJson("Corps de requête invalide", 400);
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return json({ error: "Champs invalides", details: parsed.error.flatten().fieldErrors }, 400);
  }
  const data = parsed.data;

  if (isClosedOn(data.date)) return errorJson("Le studio est fermé ce jour-là", 400);
  if (!dayTimes(data.date).includes(data.time)) return errorJson("Créneau hors horaires d'ouverture", 400);


  const start = parisToUtc(data.date, data.time);
  const end = new Date(start.getTime() + SESSION_MINUTES * 60 * 1000);
  if (start.getTime() < Date.now() + 60 * 60 * 1000) {
    return errorJson("Ce créneau est trop proche, choisissez un horaire ultérieur", 400);
  }

  const db = getAdminDb();
  const nowIso = new Date().toISOString();

  // Libère les créneaux dont le paiement n'a jamais abouti
  await db
    .from("bookings")
    .update({ status: "expired" })
    .eq("status", "pending")
    .lt("hold_expires_at", nowIso);

  const windowStart = new Date(start.getTime() - SESSION_MINUTES * 60 * 1000).toISOString();
  const windowEnd = end.toISOString();

  const [conflictRes, blockedRes] = await Promise.all([
    db
      .from("bookings")
      .select("id, start_at, end_at, status")
      .in("status", ["paid", "pending"])
      .gte("start_at", windowStart)
      .lt("start_at", windowEnd),
    db
      .from("blocked_slots")
      .select("id")
      .lt("start_at", windowEnd)
      .gt("end_at", start.toISOString()),
  ]);

  if (conflictRes.error) return errorJson(conflictRes.error.message, 500);
  if (blockedRes.error) return errorJson(blockedRes.error.message, 500);

  const conflict = (conflictRes.data ?? []).some((b) =>
    overlaps(start.getTime(), end.getTime(), Date.parse(b.start_at), Date.parse(b.end_at))
  );
  if (conflict || (blockedRes.data ?? []).length > 0) {
    return errorJson("Ce créneau vient d'être réservé. Merci d'en choisir un autre.", 409);
  }

  const product = PRODUCTS.discovery_session;
  const holdExpiresAt = new Date(Date.now() + HOLD_MINUTES * 60 * 1000).toISOString();

  const { data: booking, error: insertError } = await db
    .from("bookings")
    .insert({
      product_key: "discovery_session",
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      duration_minutes: SESSION_MINUTES,
      civilite: data.civilite === "mme" ? "Madame" : "Monsieur",
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      code_postal: data.codePostal,
      message: data.message ?? null,
      amount_cents: product.amountCents,
      currency: product.currency,
      status: "pending",
      hold_expires_at: holdExpiresAt,
    })
    .select("id")
    .single();

  if (insertError || !booking) {
    // violation de l'index unique = créneau pris entre-temps
    return errorJson("Ce créneau n'est plus disponible. Merci d'en choisir un autre.", 409);
  }

  const origin =
    req.headers.get("origin") ||
    process.env.PUBLIC_SITE_URL ||
    "https://www.vitafit-frejus.fr";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      client_reference_id: booking.id,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.amountCents,
            product_data: { name: product.name, description: product.description },
          },
        },
      ],
      metadata: {
        booking_id: booking.id,
        product_key: "discovery_session",
        slot: `${data.date} ${data.time}`,
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${origin}/reservation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/reservation?annule=1`,
    });

    await db
      .from("bookings")
      .update({ stripe_session_id: session.id })
      .eq("id", booking.id);

    return json({ url: session.url, bookingId: booking.id });
  } catch (e) {
    await db.from("bookings").update({ status: "cancelled" }).eq("id", booking.id);
    const message = e instanceof Error ? e.message : "Erreur de paiement";
    return errorJson(message, 500);
  }
}
