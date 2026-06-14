import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, Gift } from "lucide-react";
import { submitDiscoveryForm } from "@/lib/emailjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIME_SLOTS = [
  "09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45",
  "11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45",
  "14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45",
  "16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45",
  "18:00","18:15","18:30","18:45","19:00","19:15","19:30","19:45",
];

const todayISO = () => new Date().toISOString().split("T")[0];

const schema = z.object({
  civilite: z.enum(["mme", "mr"] as const, { message: "Sélectionnez une civilité" }),
  nom: z.string().trim().min(2, "Nom requis").max(60),
  prenom: z.string().trim().min(2, "Prénom requis").max(60),
  email: z.string().trim().email("Email invalide").max(150),
  mobile: z.string().trim().regex(/^[0-9 +.\-()]{8,20}$/, "Téléphone invalide"),
  codePostal: z.string().trim().regex(/^[0-9]{5}$/, "Code postal à 5 chiffres"),
  dateSouhaitee: z.string().min(1, "Date requise"),
  creneau: z.string().min(1, "Créneau requis"),
  smsOk: z.literal(true, { message: "Acceptation requise" }),
});

type FormValues = z.infer<typeof schema>;

export const DiscoveryForm = () => {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    const civText = data.civilite === "mme" ? "Madame" : "Monsieur";

    const formData = {
      from_name: `${data.prenom} ${data.nom}`,
      from_email: data.email,
      subject: `Réservation 1ère séance EMS offerte — ${data.prenom} ${data.nom}`,
      civilite: civText,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      mobile: data.mobile,
      code_postal: data.codePostal,
      date: data.dateSouhaitee,
      creneau: data.creneau,
      sms_accepte: "Oui",
    };

    const result = await submitDiscoveryForm(formData);

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
          Votre réservation a été envoyée avec succès! Nous traiterons votre demande et vous recontacterons par téléphone ou email dans les 24h ouvrées.
        </p>
      </div>
    );
  }

  const civ = watch("civilite");
  const creneau = watch("creneau");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-3xl shadow-elevated p-5 sm:p-6 md:p-10 border border-border"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow flex-shrink-0">
          <Gift className="w-6 h-6 text-accent-foreground" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg md:text-2xl font-black leading-tight">1ère séance offerte</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Offre découverte · Sans engagement</p>
        </div>
      </div>

      {/* Civilité */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm">Civilité *</Label>
        <RadioGroup
          value={civ}
          onValueChange={(v) => setValue("civilite", v as "mme" | "mr", { shouldValidate: true })}
          className="flex gap-4 sm:gap-6"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mme" id="civ-mme" /> <span className="text-sm sm:text-base">Madame</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mr" id="civ-mr" /> <span className="text-sm sm:text-base">Monsieur</span>
          </label>
        </RadioGroup>
        {errors.civilite && <p className="text-destructive text-xs mt-1">{errors.civilite.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Field label="Nom *" error={errors.nom?.message}>
          <Input {...register("nom")} placeholder="Dupont" />
        </Field>
        <Field label="Prénom *" error={errors.prenom?.message}>
          <Input {...register("prenom")} placeholder="Marie" />
        </Field>
        <Field label="Email *" error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="marie@email.fr" />
        </Field>
        <Field label="Mobile *" error={errors.mobile?.message}>
          <Input type="tel" {...register("mobile")} placeholder="06 12 34 56 78" />
        </Field>
        <Field label="Code postal *" error={errors.codePostal?.message}>
          <Input {...register("codePostal")} placeholder="83600" maxLength={5} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5 p-4 rounded-xl bg-secondary/40 border border-border">
        <Field label="Date souhaitée *" error={errors.dateSouhaitee?.message}>
          <Input
            type="date"
            min={todayISO()}
            {...register("dateSouhaitee")}
          />
        </Field>
        <Field label="Créneau souhaité *" error={errors.creneau?.message}>
          <Select
            value={creneau}
            onValueChange={(v) => setValue("creneau", v, { shouldValidate: true })}
          >
            <SelectTrigger><SelectValue placeholder="Choisir une heure" /></SelectTrigger>
            <SelectContent className="max-h-64">
              {TIME_SLOTS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-secondary/50">
        <Checkbox
          id="sms"
          onCheckedChange={(v) => setValue("smsOk", v === true ? true : (false as never), { shouldValidate: true })}
        />
        <Label htmlFor="sms" className="text-sm leading-relaxed cursor-pointer">
          J'accepte de recevoir des SMS d'information de la part d'VitaFit Fréjus Plage. *
          {errors.smsOk && <span className="block text-destructive text-xs mt-1">{errors.smsOk.message}</span>}
        </Label>
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Réserver ma séance offerte"}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Sans engagement · Réponse sous 24h ouvrées
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
