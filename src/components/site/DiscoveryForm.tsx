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

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const WEEKDAY_TIME_SLOTS = [
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
];

const SATURDAY_TIME_SLOTS = [
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
];

const todayISO = () => new Date().toISOString().split("T")[0];

const getDayFromDateString = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);

  if (!y || !m || !d) return null;

  return new Date(y, m - 1, d).getDay();
};

const isSunday = (dateStr: string) => {
  return getDayFromDateString(dateStr) === 0;
};

const isSaturday = (dateStr: string) => {
  return getDayFromDateString(dateStr) === 6;
};

const schema = z.object({
  civilite: z.enum(["mme", "mr"] as const, {
    message: "Sélectionnez une civilité",
  }),
  nom: z.string().trim().min(2, "Nom requis").max(60),
  prenom: z.string().trim().min(2, "Prénom requis").max(60),
  email: z.string().trim().email("Email invalide").max(150),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9 +.\-()]{8,20}$/, "Téléphone invalide"),
  codePostal: z
    .string()
    .trim()
    .regex(/^[0-9]{5}$/, "Code postal à 5 chiffres"),
  invitePar: z.string().trim().max(100).optional(),
  dateSouhaitee: z
    .string()
    .min(1, "Date requise")
    .refine(
      (v) => !isSunday(v),
      "Le dimanche est fermé, choisissez du lundi au samedi"
    ),
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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const civ = watch("civilite");
  const creneau = watch("creneau");
  const dateSouhaitee = watch("dateSouhaitee");

  const availableTimeSlots = isSaturday(dateSouhaitee)
    ? SATURDAY_TIME_SLOTS
    : WEEKDAY_TIME_SLOTS;

  const onSubmit = async (data: FormValues) => {
    const civText = data.civilite === "mme" ? "Madame" : "Monsieur";

    const formData = {
      from_name: `${data.prenom} ${data.nom}`,
      from_email: data.email,
      subject: `Réservation première séance EMS -50% — ${data.prenom} ${data.nom}`,
      civilite: civText,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      mobile: data.mobile,
      code_postal: data.codePostal,
      invite_par: data.invitePar || "Non renseigné",
      date: data.dateSouhaitee,
      creneau: data.creneau,
      sms_accepte: "Oui",
    };

    const result = await submitDiscoveryForm(formData);

    if (result.success) {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "reservation_success",
      });

      toast({
        title: "Demande envoyée ✅",
        description:
          "Nous recevrons votre demande et vous répondrons dans les 24h.",
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

        <h3 className="text-xl md:text-2xl font-black mb-3">
          Demande reçue ✅
        </h3>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Votre réservation a été envoyée avec succès ! Nous traiterons votre
          demande et vous recontacterons par téléphone ou email dans les 24h
          ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-2xl md:rounded-3xl shadow-elevated p-4 sm:p-6 md:p-8 border border-border"
    >
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-accent grid place-items-center shadow-glow flex-shrink-0">
          <Gift className="w-5 h-5 text-accent-foreground" />
        </div>

        <div className="min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-black leading-tight">
            Ma séance à 19,50 €
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground">
            -50 % sur la première séance
          </p>
        </div>
      </div>

      <div className="mb-4">
        <Label className="mb-2 block text-sm">Civilité *</Label>

        <RadioGroup
          value={civ}
          onValueChange={(v) =>
            setValue("civilite", v as "mme" | "mr", {
              shouldValidate: true,
            })
          }
          className="flex gap-4 sm:gap-6"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mme" id="civ-mme" />
            <span className="text-sm sm:text-base">Madame</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="mr" id="civ-mr" />
            <span className="text-sm sm:text-base">Monsieur</span>
          </label>
        </RadioGroup>

        {errors.civilite && (
          <p className="text-destructive text-xs mt-1">
            {errors.civilite.message}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <Field label="Nom *" error={errors.nom?.message}>
          <Input {...register("nom")} placeholder="Dupont" />
        </Field>

        <Field label="Prénom *" error={errors.prenom?.message}>
          <Input {...register("prenom")} placeholder="Marie" />
        </Field>

        <Field label="Email *" error={errors.email?.message}>
          <Input
            type="email"
            {...register("email")}
            placeholder="marie@email.fr"
          />
        </Field>

        <Field label="Mobile *" error={errors.mobile?.message}>
          <Input
            type="tel"
            {...register("mobile")}
            placeholder="06 12 34 56 78"
          />
        </Field>

        <Field label="Code postal *" error={errors.codePostal?.message}>
          <Input
            {...register("codePostal")}
            placeholder="83600"
            maxLength={5}
          />
        </Field>

        <Field label="Invité par" error={errors.invitePar?.message}>
          <Input
            {...register("invitePar")}
            placeholder="Nom de la personne"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4 p-3 sm:p-4 rounded-xl bg-secondary/40 border border-border">
        <Field
          label={
            <>
              Date souhaitée *
              <span className="block text-muted-foreground text-xs font-normal">
                Lundi au samedi
              </span>
            </>
          }
          error={errors.dateSouhaitee?.message}
        >
          <Input
            type="date"
            min={todayISO()}
            {...register("dateSouhaitee", {
              onChange: () => {
                setValue("creneau", "", {
                  shouldValidate: false,
                });
              },
            })}
          />
        </Field>

        <Field
          label={
            <>
              Créneau souhaité *
              <span className="block text-muted-foreground text-xs font-normal">
                Lun–Ven : dernier créneau 17h30 · Sam : 12h30
              </span>
            </>
          }
          error={errors.creneau?.message}
        >
          <Select
            value={creneau}
            onValueChange={(v) =>
              setValue("creneau", v, {
                shouldValidate: true,
              })
            }
            disabled={!dateSouhaitee || isSunday(dateSouhaitee)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  !dateSouhaitee
                    ? "Choisissez d'abord une date"
                    : "Choisir une heure"
                }
              />
            </SelectTrigger>

            <SelectContent className="max-h-64">
              {availableTimeSlots.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="flex items-start gap-3 mb-4 p-3 rounded-xl bg-secondary/50">
        <Checkbox
          id="sms"
          onCheckedChange={(v) =>
            setValue(
              "smsOk",
              v === true ? true : (false as never),
              { shouldValidate: true }
            )
          }
        />

        <Label
          htmlFor="sms"
          className="text-xs sm:text-sm leading-snug cursor-pointer"
        >
          J'accepte de recevoir des SMS d'information de la part de VitaFit
          Fréjus Plage. *

          {errors.smsOk && (
            <span className="block text-destructive text-xs mt-1">
              {errors.smsOk.message}
            </span>
          )}
        </Label>
      </div>

      <Button
        type="submit"
        variant="hero"
        size="xl"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Envoi en cours..."
          : "Réserver ma première séance à -50 %"}
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-2.5">
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
  label: React.ReactNode;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <Label className="mb-2 block text-sm">{label}</Label>

    {children}

    {error && (
      <p className="text-destructive text-xs mt-1">
        {error}
      </p>
    )}
  </div>
);
