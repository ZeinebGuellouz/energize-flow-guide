import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { CalendarDays, Clock, Loader2, ShieldCheck } from "lucide-react";
import { OPENING_LABEL, isClosedDay } from "@/lib/hours";

type Slot = { time: string; startAt: string; endAt: string; available: boolean };

const todayISO = () => new Date().toISOString().split("T")[0];

const PRICE_LABEL = "19 €";

export default function Reservation() {
  const [date, setDate] = useState(todayISO());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [closed, setClosed] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    civilite: "mme",
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    codePostal: "",
    message: "",
  });

  const cancelled = useMemo(
    () => new URLSearchParams(window.location.search).get("annule") === "1",
    []
  );

  useEffect(() => {
    if (cancelled) {
      toast({
        title: "Paiement annulé",
        description: "Votre créneau a été libéré. Vous pouvez en choisir un autre.",
      });
    }
  }, [cancelled]);

  useEffect(() => {
    let active = true;
    setTime("");
    setLoadingSlots(true);
    fetch(`/api/slots?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setClosed(Boolean(data.closed));
        setSlots(Array.isArray(data.slots) ? data.slots : []);
      })
      .catch(() => {
        if (active) {
          setSlots([]);
          setClosed(isClosedDay(date));
        }
      })
      .finally(() => active && setLoadingSlots(false));
    return () => {
      active = false;
    };
  }, [date]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) {
      toast({ title: "Choisissez un créneau", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, ...form, message: form.message || undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        toast({
          title: "Réservation impossible",
          description: data.error || "Merci de vérifier vos informations.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }
      window.location.href = data.url as string;
    } catch {
      toast({ title: "Erreur réseau", description: "Réessayez dans un instant.", variant: "destructive" });
      setSubmitting(false);
    }
  };

  const available = slots.filter((s) => s.available);

  return (
    <Layout>
      <SEO
        title={`Réserver ma séance EMS à Fréjus Plage — ${PRICE_LABEL} (-50 %)`}
        description="Réservez en ligne votre première séance EMS de 30 min à VitaFit Fréjus Plage : choisissez votre créneau et payez en toute sécurité."
        path="/reservation"
      />
      <PageHero
        eyebrow="Réservation en ligne"
        title={<>Réservez votre première séance EMS à -50 %</>}
        subtitle={`Séance de 30 minutes · ${PRICE_LABEL} au lieu de 39 € · ${OPENING_LABEL}`}
      />

      <section className="py-10 md:py-16">
        <div className="container-px max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-accent" /> 1. Choisissez votre créneau
            </h2>
            <Label htmlFor="date" className="text-sm font-semibold">Date</Label>
            <Input
              id="date"
              type="date"
              min={todayISO()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mb-4 mt-1"
            />

            {loadingSlots ? (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Chargement des disponibilités…
              </p>
            ) : closed ? (
              <p className="text-sm text-muted-foreground">Le studio est fermé ce jour-là. {OPENING_LABEL}.</p>
            ) : available.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun créneau disponible à cette date.</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    disabled={!s.available}
                    onClick={() => setTime(s.time)}
                    className={[
                      "rounded-lg py-2 text-sm font-semibold border transition-colors",
                      !s.available
                        ? "opacity-40 cursor-not-allowed border-border text-muted-foreground line-through"
                        : time === s.time
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border hover:border-accent hover:text-accent",
                    ].join(" ")}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            )}

            <p className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" /> Séance de 30 minutes, encadrée par un coach certifié.
            </p>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="text-lg font-bold mb-4">2. Vos informations</h2>

            <RadioGroup
              value={form.civilite}
              onValueChange={(v) => setForm((f) => ({ ...f, civilite: v }))}
              className="flex gap-4 mb-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="mme" id="civ-mme" />
                <Label htmlFor="civ-mme">Madame</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="mr" id="civ-mr" />
                <Label htmlFor="civ-mr">Monsieur</Label>
              </div>
            </RadioGroup>

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <Input required minLength={2} placeholder="Prénom *" value={form.prenom} onChange={set("prenom")} />
              <Input required minLength={2} placeholder="Nom *" value={form.nom} onChange={set("nom")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <Input required type="email" placeholder="Email *" value={form.email} onChange={set("email")} />
              <Input required type="tel" placeholder="Téléphone *" value={form.telephone} onChange={set("telephone")} />
            </div>
            <Input
              required
              placeholder="Code postal *"
              maxLength={5}
              pattern="[0-9]{5}"
              value={form.codePostal}
              onChange={set("codePostal")}
              className="mb-3"
            />
            <Textarea
              placeholder="Votre message (facultatif)"
              value={form.message}
              onChange={set("message")}
              className="mb-4"
            />

            <div className="rounded-xl bg-secondary/50 p-3 mb-4 text-sm flex items-center justify-between">
              <span>Séance découverte EMS (30 min)</span>
              <strong>{PRICE_LABEL}</strong>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting || !time}>
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Redirection…</>
              ) : (
                <>Payer {PRICE_LABEL} et réserver</>
              )}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Paiement sécurisé par Stripe. Votre créneau est confirmé
              seulement après paiement.
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
