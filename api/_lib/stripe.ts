import Stripe from "stripe";
import { requireEnv } from "./env";

/** Stripe client built from your own keys (Vercel environment variables). */
export function getStripe(): Stripe {
  return new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
    apiVersion: "2025-10-29.clover" as Stripe.LatestApiVersion,
  });
}

/** Catalogue produits — réutilisable plus tard pour la boutique Herbalife. */
export const PRODUCTS = {
  discovery_session: {
    name: "Séance découverte EMS — VitaFit Fréjus Plage",
    description: "Première séance EMS de 30 min (-50 %)",
    amountCents: 1950,
    currency: "eur",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
