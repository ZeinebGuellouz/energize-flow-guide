import type Stripe from "stripe";
import { getStripe } from "./_lib/stripe";
import { getAdminDb } from "./_lib/supabase";
import { errorJson, json, requireEnv } from "./_lib/env";

/**
 * Webhook Stripe — SEULE source de vérité pour confirmer une réservation.
 * URL à configurer dans Stripe : https://www.vitafit-frejus.fr/api/stripe-webhook
 * Événements : checkout.session.completed, checkout.session.expired,
 *              checkout.session.async_payment_failed, charge.refunded
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return errorJson("Method not allowed", 405);

  const signature = req.headers.get("stripe-signature");
  if (!signature) return errorJson("Signature manquante", 400);

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      requireEnv("STRIPE_WEBHOOK_SECRET")
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Signature invalide";
    return errorJson(`Webhook non vérifié: ${message}`, 400);
  }

  const db = getAdminDb();

  // Journal d'événements (idempotence + traçabilité, réutilisable pour la boutique)
  const { error: logError } = await db
    .from("stripe_events")
    .insert({ id: event.id, type: event.type });
  if (logError) return json({ received: true, duplicate: true });

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id || session.client_reference_id;
      if (bookingId && session.payment_status === "paid") {
        await db
          .from("bookings")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            hold_expires_at: null,
            stripe_payment_intent:
              typeof session.payment_intent === "string" ? session.payment_intent : null,
          })
          .eq("id", bookingId);
      }
      break;
    }
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id || session.client_reference_id;
      if (bookingId) {
        await db
          .from("bookings")
          .update({ status: "expired" })
          .eq("id", bookingId)
          .eq("status", "pending");
      }
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : null;
      if (pi) {
        await db.from("bookings").update({ status: "refunded" }).eq("stripe_payment_intent", pi);
      }
      break;
    }
    default:
      break;
  }

  return json({ received: true });
}
