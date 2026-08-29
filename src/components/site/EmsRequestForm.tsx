import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { OPENING_LABEL, isClosedDay, timeSlotsFor } from "@/lib/hours";
import { CheckCircle2, Dumbbell } from "lucide-react";
import { submitRequestForm } from "@/lib/emailjs";

const objectifs = ["Perte de poids", "Prise de masse / tonification", "Récupération / bien-être", "Préparation physique", "Autre"];
const formules = ["Séance unitaire", "Pack 5 séances", "Pack 10 séances", "Abonnement mensuel", "Je ne sais pas encore"];
const todayISO = () => new Date().toISOString().split("T")[0];


const schema = z.object({
  civilite: z.enum(["mme", "mr"] as const, { message: "Sélectionnez une civilité" }),
  nom: z.string().trim().min(2, "Nom requis").max(60),
  prenom: z.string().trim().min(2, "Prénom requis").max(60),
  email: z.string().trim().email("Email invalide").max(150),
  telephone: z.string().trim().regex(/^[0-9 +.\-()]{8,20}$/, "Téléphone invalide"),
  objectif: z.string().min(1, "Choisissez un objectif"),
  formule: z.string().min(1, "Choisissez une formule"),
  dateSouhaitee: z.string().min(1, "Date requise").refine(
    (v) => !isClosedDay(v),
    "Fermé ce jour-là (Lun–Ven 8h–18h, Sam 8h–13h, dimanche fermé)"
  ),
  creneau: z.string().min(1, "Créneau requis"),
  message: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

type EmsRequestFormProps = {
  defaultFormule?: string;
  title?: string;
  subtitle?: string;
};

export const EmsRequestForm = ({
  defaultFormule,
  title = "Demander mes séances EMS",
  subtitle = "Achat / informations · 1 personne",
}: EmsRequestFormProps = {}) => {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormule ? { formule: defaultFormule } : undefined,
  });

  const onSubmit = async (data: FormValues) => {
    const civText = data.civilite === "mme" ? "Madame" : "Monsieur";

    const formData = {
      from_name: `${data.prenom} ${data.nom}`,
      from_email: data.email,
      subject: `Demande EMS — ${data.formule} — ${data.prenom} ${data.nom}`,
      civilite: civText,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      objectif: data.objectif,
      formule: data.formule,
      date: data.dateSouhaitee,
      creneau: data.creneau,
      message: data.message || "(aucun)",
    };

    const result = await submitRequestForm(formData);

    if (result.success) {
      toast({
        title: "Demande envoyée ✅",
        description: "Nous recevrons votre demande et vous répondrons dans les 24h.",
      });
      setDone(true);
    } else {
      toast({
        title: "Erreur d'envoi",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  if (done) {
    return (
      <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-10 text-center border border-border">
        <CheckCircle2 className="w-14 h-14 md:w-16 md:h-16 text-accent mx-auto mb-4" />
        <h3 className="text-xl md:text-2xl font-black mb-3">Demande reçue ✅</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Votre demande a été envoyée avec succès! Nous traiterons votre dossier et vous recontacterons par téléphone ou email dans les 24h ouvrées.
        </p>
      </div>
    );
  }

  const civ = watch("civilite");
  const formule = watch("formule");
  const objectif = watch("objectif");
  const creneau = watch("creneau");
  const dateSouhaitee = watch("dateSouhaitee");
  const timeSlots = timeSlotsFor(dateSouhaitee || "");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-3xl shadow-elevated p-5 sm:p-6 md:p-10 border border-border"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow">
          <Dumbbell className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="mb-5">
        <Label className="mb-2 block">Civilité *</Label>
        <RadioGroup
          value={civ}
          onValueChange={(v) => setValue("civilite", v as "mme" | "mr", { shouldValidate: true })}
          className="flex gap-4"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mme" id="ems-civ-mme" /> Madame
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mr" id="ems-civ-mr" /> Monsieur
          </label>
        </RadioGroup>
        {errors.civilite && <p className="text-destructive text-xs mt-1">{errors.civilite.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <Field label="Nom *" error={errors.nom?.message}>
          <Input {...register("nom")} placeholder="Dupont" />
        </Field>
        <Field label="Prénom *" error={errors.prenom?.message}>
          <Input {...register("prenom")} placeholder="Marie" />
        </Field>
        <Field label="Email *" error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="marie@email.fr" />
        </Field>
        <Field label="Téléphone *" error={errors.telephone?.message}>
          <Input type="tel" {...register("telephone")} placeholder="06 12 34 56 78" />
        </Field>
        <Field label="Objectif *" error={errors.objectif?.message}>
          <Select value={objectif} onValueChange={(v) => setValue("objectif", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Choisissez votre objectif" /></SelectTrigger>
            <SelectContent>
              {objectifs.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Formule souhaitée *" error={errors.formule?.message}>
          <Select value={formule} onValueChange={(v) => setValue("formule", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Choisissez une formule" /></SelectTrigger>
            <SelectContent>
            {(defaultFormule && !formules.includes(defaultFormule)
              ? [defaultFormule, ...formules]
              : formules
            ).map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5 p-4 rounded-xl bg-secondary/40 border border-border">
        <Field label={<>Date souhaitée * <span className="block text-muted-foreground text-xs font-normal">{OPENING_LABEL}</span></>} error={errors.dateSouhaitee?.message}>
          <Input type="date" min={todayISO()} {...register("dateSouhaitee")} />
        </Field>
        <Field label="Créneau souhaité *" error={errors.creneau?.message}>
          <Select value={creneau} onValueChange={(v) => setValue("creneau", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Choisir une heure" /></SelectTrigger>
            <SelectContent className="max-h-64">
              {timeSlots.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">Choisissez d'abord une date ouvrée</div>
              ) : timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Votre message" error={errors.message?.message} className="mb-6">
        <Textarea
          rows={4}
          {...register("message")}
          placeholder="Précisez vos disponibilités, questions, ou attentes particulières…"
        />
      </Field>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Réponse personnalisée sous 24h ouvrées
      </p>
    </form>
  );
};

const Field = ({
  label,
  error,
  children,
  className,
}: {
  label: React.ReactNode;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <Label className="mb-2 block text-sm">{label}</Label>
    {children}
    {error && <p className="text-destructive text-xs mt-1">{error}</p>}
  </div>
);
