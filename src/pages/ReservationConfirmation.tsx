import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type Booking = {
  status: string;
  startAt: string;
  endAt: string;
  amountCents: number;
  currency: string;
  prenom: string;
  nom: string;
  email: string;
};

const formatSlot = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

export default function ReservationConfirmation() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") || "";
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [tries, setTries] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setError("Session de paiement introuvable.");
      return;
    }
    let active = true;
    const check = async () => {
      try {
        const res = await fetch(`/api/booking?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (!active) return;
        if (!res.ok) {
          setError(data.error || "Réservation introuvable.");
          return;
        }
        setBooking(data as Booking);
        if (data.status !== "paid" && tries < 8) {
          setTimeout(() => active && setTries((t) => t + 1), 2000);
        }
      } catch {
        if (active) setError("Erreur réseau, réessayez.");
      }
    };
    check();
    return () => {
      active = false;
    };
  }, [sessionId, tries]);

  const paid = booking?.status === "paid";

  return (
    <Layout>
      <SEO
        title="Réservation confirmée — VitaFit Fréjus Plage"
        description="Confirmation de votre séance EMS réservée en ligne chez VitaFit Fréjus Plage."
        path="/reservation/confirmation"
        noindex
      />
      <section className="py-16 md:py-24">
        <div className="container-px max-w-2xl mx-auto text-center">
          {error ? (
            <>
              <XCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-black mb-3">Un problème est survenu</h1>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button asChild><Link to="/reservation">Retour à la réservation</Link></Button>
            </>
          ) : !booking ? (
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Vérification de votre paiement…
            </p>
          ) : paid ? (
            <>
              <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-black mb-3">Réservation confirmée 🎉</h1>
              <p className="text-muted-foreground mb-6">
                Merci {booking.prenom} ! Votre séance EMS de 30 minutes est réservée le{" "}
                <strong className="text-foreground">{formatSlot(booking.startAt)}</strong> à VitaFit Fréjus Plage.
                Un email de confirmation a été envoyé à {booking.email}.
              </p>
              <Button asChild size="lg"><Link to="/">Retour à l'accueil</Link></Button>
            </>
          ) : (
            <>
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-accent" />
              <h1 className="text-2xl font-black mb-3">Paiement en cours de validation…</h1>
              <p className="text-muted-foreground">
                Cette page se met à jour automatiquement dès la confirmation de votre banque.
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
