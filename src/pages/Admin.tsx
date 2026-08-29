import { useCallback, useEffect, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SEO } from "@/components/site/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { db, isDbConfigured } from "@/lib/db";
import { OPENING_LABEL, timeSlotsFor } from "@/lib/hours";
import { Loader2, LogOut, Lock, Trash2 } from "lucide-react";

type Booking = {
  id: string;
  start_at: string;
  end_at: string;
  status: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  amount_cents: number;
  message: string | null;
};

type Blocked = { id: string; start_at: string; end_at: string; reason: string | null };

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const todayISO = () => new Date().toISOString().split("T")[0];

export default function Admin() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [blockDate, setBlockDate] = useState(todayISO());
  const [blockTime, setBlockTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!isDbConfigured) {
      setReady(true);
      return;
    }
    db.auth.getSession().then(({ data }) => {
      setSignedIn(Boolean(data.session));
      setReady(true);
    });
    const { data: sub } = db.auth.onAuthStateChange((_e, session) => setSignedIn(Boolean(session)));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const from = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const [b, bl] = await Promise.all([
      db.from("bookings").select("*").gte("start_at", from).order("start_at", { ascending: true }),
      db.from("blocked_slots").select("*").gte("start_at", from).order("start_at", { ascending: true }),
    ]);
    if (b.error || bl.error) {
      toast({
        title: "Accès refusé",
        description: "Votre compte n'a pas le rôle admin.",
        variant: "destructive",
      });
    }
    setBookings((b.data as Booking[]) ?? []);
    setBlocked((bl.data as Blocked[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (signedIn) void load();
  }, [signedIn, load]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await db.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast({ title: "Connexion impossible", description: error.message, variant: "destructive" });
  };

  const signOut = async () => {
    await db.auth.signOut();
    setBookings([]);
    setBlocked([]);
  };

  const cancelBooking = async (id: string) => {
    const { error } = await db.from("bookings").update({ status: "cancelled" }).eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else void load();
  };

  const addBlock = async () => {
    if (!blockTime) {
      toast({ title: "Choisissez une heure", variant: "destructive" });
      return;
    }
    const start = new Date(`${blockDate}T${blockTime}:00`);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const { error } = await db.from("blocked_slots").insert({
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      reason: reason || null,
    });
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else {
      setReason("");
      void load();
    }
  };

  const removeBlock = async (id: string) => {
    const { error } = await db.from("blocked_slots").delete().eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else void load();
  };

  if (!ready) return null;

  return (
    <Layout>
      <SEO title="Administration — VitaFit" description="Espace de gestion des réservations." path="/admin" noindex />
      <section className="py-24">
        <div className="container-px max-w-5xl mx-auto">
          {!isDbConfigured ? (
            <p className="text-muted-foreground">
              Base de données non configurée : renseignez VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.
            </p>
          ) : !signedIn ? (
            <form onSubmit={signIn} className="max-w-sm mx-auto rounded-2xl border border-border bg-card p-6">
              <h1 className="text-xl font-black mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-accent" /> Espace VitaFit
              </h1>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-3 mt-1" />
              <Label htmlFor="pwd">Mot de passe</Label>
              <Input id="pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-4 mt-1" />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Se connecter"}
              </Button>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black">Réservations</h1>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card overflow-x-auto mb-10">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50 text-left">
                    <tr>
                      <th className="p-3">Créneau</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 && (
                      <tr><td colSpan={5} className="p-4 text-muted-foreground">Aucune réservation à venir.</td></tr>
                    )}
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-t border-border">
                        <td className="p-3 whitespace-nowrap">{fmt(b.start_at)}</td>
                        <td className="p-3">{b.prenom} {b.nom}</td>
                        <td className="p-3 text-muted-foreground">{b.email}<br />{b.telephone}</td>
                        <td className="p-3">
                          <span className={b.status === "paid" ? "text-accent font-semibold" : "text-muted-foreground"}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {b.status !== "cancelled" && (
                            <Button variant="ghost" size="sm" onClick={() => cancelBooking(b.id)}>Annuler</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-black mb-2">Créneaux bloqués</h2>
              <p className="text-xs text-muted-foreground mb-4">{OPENING_LABEL}</p>
              <div className="rounded-2xl border border-border bg-card p-5 mb-6 grid sm:grid-cols-4 gap-3 items-end">
                <div>
                  <Label htmlFor="bdate">Date</Label>
                  <Input id="bdate" type="date" min={todayISO()} value={blockDate} onChange={(e) => { setBlockDate(e.target.value); setBlockTime(""); }} />
                </div>
                <div>
                  <Label htmlFor="btime">Heure</Label>
                  <select
                    id="btime"
                    value={blockTime}
                    onChange={(e) => setBlockTime(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">—</option>
                    {timeSlotsFor(blockDate).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="reason">Motif</Label>
                  <Input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Congés, RDV…" />
                </div>
                <Button onClick={addBlock}>Bloquer</Button>
              </div>

              <ul className="space-y-2">
                {blocked.map((s) => (
                  <li key={s.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-2 text-sm">
                    <span>{fmt(s.start_at)} {s.reason ? `· ${s.reason}` : ""}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeBlock(s.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              {loading && <p className="mt-4 text-muted-foreground text-sm flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Chargement…</p>}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
