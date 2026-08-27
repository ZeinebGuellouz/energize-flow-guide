import { getAdminDb } from "./_lib/supabase";
import { errorJson, json } from "./_lib/env";
import { getStripe } from "./_lib/stripe";

/** Récupère l'état d'une réservation à partir de l'ID de session Stripe (page de confirmation). */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") return errorJson("Method not allowed", 405);

  const url = new URL(req.url, "http://localhost");
  const sessionId = url.searchParams.get("session_id") || "";
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return errorJson("session_id invalide", 400);

  const db = getAdminDb();

  const { data: booking, error } = await db
    .from("bookings")
    .select("id, start_at, end_at, status, amount_cents, currency, prenom, nom, email")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (error) return errorJson(error.message, 500);
  if (!booking) return errorJson("Réservation introuvable", 404);

  // Filet de sécurité si le webhook n'est pas encore arrivé
  if (booking.status !== "paid") {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        await db
          .from("bookings")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
          })
          .eq("id", booking.id);
        booking.status = "paid";
      }
    } catch {
      /* on renvoie l'état connu */
    }
  }

  return json({
    status: booking.status,
    startAt: booking.start_at,
    endAt: booking.end_at,
    amountCents: booking.amount_cents,
    currency: booking.currency,
    prenom: booking.prenom,
    nom: booking.nom,
    email: booking.email,
  });
}
