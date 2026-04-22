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
import { CheckCircle2, Gift, Users } from "lucide-react";

const schema = z.object({
  civilite: z.enum(["mme", "mr"] as const, { message: "Sélectionnez une civilité" }),
  nom: z.string().trim().min(2, "Nom requis").max(60),
  prenom: z.string().trim().min(2, "Prénom requis").max(60),
  email: z.string().trim().email("Email invalide").max(150),
  mobile: z.string().trim().regex(/^[0-9 +.\-()]{8,20}$/, "Téléphone invalide"),
  codePostal: z.string().trim().regex(/^[0-9]{5}$/, "Code postal à 5 chiffres"),
  smsOk: z.literal(true, { message: "Acceptation requise" }),
  amiNom: z.string().trim().min(2, "Nom de l'ami requis").max(60),
  amiPrenom: z.string().trim().min(2, "Prénom de l'ami requis").max(60),
  amiMobile: z.string().trim().regex(/^[0-9 +.\-()]{8,20}$/, "Téléphone invalide"),
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
    await new Promise((r) => setTimeout(r, 600));
    console.log("Discovery booking:", data);
    toast({
      title: "Demande envoyée 🎉",
      description: "Nous vous contactons sous 24h pour fixer votre séance offerte.",
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-card rounded-3xl shadow-elevated p-10 text-center border border-border">
        <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-black mb-2">Demande bien reçue !</h3>
        <p className="text-muted-foreground">
          Notre équipe vous appelle très vite pour fixer votre séance découverte offerte.
        </p>
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
          <Gift className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black">Séance découverte offerte</h3>
          <p className="text-sm text-muted-foreground">Pour vous + 1 ami·e</p>
        </div>
      </div>

      {/* Civilité */}
      <div className="mb-5">
        <Label className="mb-2 block">Civilité *</Label>
        <RadioGroup
          value={civ}
          onValueChange={(v) => setValue("civilite", v as "mme" | "mr", { shouldValidate: true })}
          className="flex gap-4"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mme" id="civ-mme" /> <span>Madame</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mr" id="civ-mr" /> <span>Monsieur</span>
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
        <Field label="Mobile *" error={errors.mobile?.message}>
          <Input type="tel" {...register("mobile")} placeholder="06 12 34 56 78" />
        </Field>
        <Field label="Code postal *" error={errors.codePostal?.message}>
          <Input {...register("codePostal")} placeholder="83600" maxLength={5} />
        </Field>
      </div>

      <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-secondary/50">
        <Checkbox
          id="sms"
          onCheckedChange={(v) => setValue("smsOk", v === true ? true : (false as never), { shouldValidate: true })}
        />
        <Label htmlFor="sms" className="text-sm leading-relaxed cursor-pointer">
          J'accepte de recevoir des SMS d'information de la part d'Espace Nutri-Forme Fréjus Plage. *
          {errors.smsOk && <span className="block text-destructive text-xs mt-1">{errors.smsOk.message}</span>}
        </Label>
      </div>

      <div className="border-t border-border pt-6 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-accent" />
          <h4 className="font-bold">Coordonnées de votre ami·e</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom *" error={errors.amiNom?.message}>
            <Input {...register("amiNom")} placeholder="Martin" />
          </Field>
          <Field label="Prénom *" error={errors.amiPrenom?.message}>
            <Input {...register("amiPrenom")} placeholder="Julie" />
          </Field>
          <Field label="Mobile *" error={errors.amiMobile?.message} className="sm:col-span-2">
            <Input type="tel" {...register("amiMobile")} placeholder="06 98 76 54 32" />
          </Field>
        </div>
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Réserver notre séance offerte"}
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