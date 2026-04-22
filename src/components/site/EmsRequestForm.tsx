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
import { CheckCircle2, Dumbbell } from "lucide-react";

const objectifs = ["Perte de poids", "Prise de masse / tonification", "Récupération / bien-être", "Préparation physique", "Autre"];
const formules = ["Séance unitaire", "Pack 5 séances", "Pack 10 séances", "Abonnement mensuel", "Je ne sais pas encore"];

const schema = z.object({
  civilite: z.enum(["mme", "mr"] as const, { message: "Sélectionnez une civilité" }),
  nom: z.string().trim().min(2, "Nom requis").max(60),
  prenom: z.string().trim().min(2, "Prénom requis").max(60),
  email: z.string().trim().email("Email invalide").max(150),
  telephone: z.string().trim().regex(/^[0-9 +.\-()]{8,20}$/, "Téléphone invalide"),
  objectif: z.string().min(1, "Choisissez un objectif"),
  formule: z.string().min(1, "Choisissez une formule"),
  message: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

export const EmsRequestForm = () => {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("EMS request:", data);
    toast({
      title: "Demande envoyée ✅",
      description: "Nous revenons vers vous très rapidement.",
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-card rounded-3xl shadow-elevated p-10 text-center border border-border">
        <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-black mb-2">Merci pour votre demande !</h3>
        <p className="text-muted-foreground">Un coach vous recontacte dans les plus brefs délais.</p>
      </div>
    );
  }

  const civ = watch("civilite");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-3xl shadow-elevated p-6 md:p-10 border border-border"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow">
          <Dumbbell className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black">Demander mes séances EMS</h3>
          <p className="text-sm text-muted-foreground">Achat / informations · 1 personne</p>
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
          <Select onValueChange={(v) => setValue("objectif", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Choisissez votre objectif" /></SelectTrigger>
            <SelectContent>
              {objectifs.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Formule souhaitée *" error={errors.formule?.message}>
          <Select onValueChange={(v) => setValue("formule", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Choisissez une formule" /></SelectTrigger>
            <SelectContent>
              {formules.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
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
  label: string;
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