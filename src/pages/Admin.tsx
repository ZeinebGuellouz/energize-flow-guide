import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { STATUS_LABELS, duplicateIds, missingFields, type InscriptionStatus } from "@/lib/inscriptions";

type Row = Tables<"inscriptions">;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const { error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    if (error) setMsg(error.message);
    else if (mode === "up") setMsg("Compte créé. Confirmez votre email, puis demandez l'activation de l'accès administrateur.");
  };
  return (
    <form onSubmit={submit} className="mx-auto mt-24 max-w-sm space-y-3 rounded-xl border bg-card p-6">
      <h1 className="text-xl font-semibold">Espace administrateur VitaFit</h1>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      <Button type="submit" className="w-full">{mode === "in" ? "Se connecter" : "Créer le compte"}</Button>
      <button type="button" className="text-sm text-muted-foreground underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "Créer un compte" : "J'ai déjà un compte"}
      </button>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
    </form>
  );
};

const fmtDate = (s: string) => new Date(s).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [flag, setFlag] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  const load = async () => {
    const { data, error } = await supabase.from("inscriptions").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Erreur de chargement", description: error.message, variant: "destructive" });
    else setRows(data ?? []);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const dups = useMemo(() => duplicateIds(rows), [rows]);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (source !== "all" && r.source !== source) return false;
      if (flag === "missing" && missingFields(r).length === 0) return false;
      if (flag === "dup" && !dups.has(r.id)) return false;
      if (!s) return true;
      return [r.nom, r.prenom, r.email, r.telephone, r.code_postal, r.invite_par, r.date_rdv]
        .some((v) => (v ?? "").toLowerCase().includes(s));
    });
  }, [rows, q, status, source, flag, dups]);

  const setRowStatus = async (id: string, value: InscriptionStatus) => {
    const { error } = await supabase.from("inscriptions").update({ status: value }).eq("id", id);
    if (error) return toast({ title: "Échec", description: error.message, variant: "destructive" });
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: value } : r)));
    toast({ title: `Statut : ${STATUS_LABELS[value]}` });
  };

  const exportFile = (type: "xlsx" | "csv") => {
    const data = filtered.map((r) => ({
      "Date envoi": fmtDate(r.created_at),
      Source: r.source === "decouverte" ? "Séance découverte" : "Demande EMS",
      Civilité: r.civilite ?? "", Nom: r.nom ?? "", Prénom: r.prenom ?? "", Email: r.email ?? "",
      Téléphone: r.telephone ?? "", "Code postal": r.code_postal ?? "", "Invité par": r.invite_par ?? "",
      "Date RDV": r.date_rdv ?? "", Créneau: r.creneau ?? "", Objectif: r.objectif ?? "", Formule: r.formule ?? "",
      Message: r.message ?? "", Statut: STATUS_LABELS[r.status as InscriptionStatus],
      "Données manquantes": missingFields(r).join(", "), "Doublon potentiel": dups.has(r.id) ? "Oui" : "",
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), "Inscriptions");
    XLSX.writeFile(wb, `VitaFit_inscriptions_${new Date().toISOString().slice(0, 10)}.${type}`, { bookType: type });
  };

  if (!ready) return null;
  if (!session) return <Login />;
  if (isAdmin === null) return <p className="p-8">Chargement…</p>;
  if (!isAdmin)
    return (
      <div className="mx-auto mt-24 max-w-sm space-y-3 text-center">
        <p>Ce compte ({session.user.email}) n'a pas l'accès administrateur.</p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>Se déconnecter</Button>
      </div>
    );

  const missingCount = rows.filter((r) => missingFields(r).length).length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Inscriptions VitaFit</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} au total · {missingCount} avec données manquantes · {dups.size} doublons potentiels
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportFile("xlsx")}>Export Excel</Button>
          <Button variant="outline" onClick={() => exportFile("csv")}>Export CSV</Button>
          <Button variant="ghost" onClick={() => supabase.auth.signOut()}>Déconnexion</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-2 md:grid-cols-4">
        <Input placeholder="Rechercher (nom, email, téléphone…)" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {Object.entries(STATUS_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={source} onValueChange={setSource}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les formulaires</SelectItem>
            <SelectItem value="decouverte">Séance découverte</SelectItem>
            <SelectItem value="demande_ems">Demande EMS</SelectItem>
          </SelectContent>
        </Select>
        <Select value={flag} onValueChange={setFlag}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les fiches</SelectItem>
            <SelectItem value="missing">Données manquantes</SelectItem>
            <SelectItem value="dup">Doublons potentiels</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Envoyé le</TableHead><TableHead>Client</TableHead><TableHead>Contact</TableHead>
              <TableHead>RDV</TableHead><TableHead>Invité par / formule</TableHead><TableHead>Alertes</TableHead><TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => {
              const miss = missingFields(r);
              return (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap text-xs">{fmtDate(r.created_at)}</TableCell>
                  <TableCell>{[r.civilite, r.prenom, r.nom].filter(Boolean).join(" ") || "—"}</TableCell>
                  <TableCell className="text-xs">{r.email ?? "—"}<br />{r.telephone ?? ""} {r.code_postal ? `· ${r.code_postal}` : ""}</TableCell>
                  <TableCell className="whitespace-nowrap">{r.date_rdv ?? "—"} {r.creneau ?? ""}</TableCell>
                  <TableCell className="max-w-[220px] text-xs">{r.formule ?? r.invite_par ?? "—"}</TableCell>
                  <TableCell className="space-y-1">
                    {miss.length > 0 && <Badge variant="destructive" title={miss.join(", ")}>Manquant : {miss.join(", ")}</Badge>}
                    {dups.has(r.id) && <Badge variant="secondary">Doublon potentiel</Badge>}
                  </TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => setRowStatus(r.id, v as InscriptionStatus)}>
                      <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">Aucune inscription</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
