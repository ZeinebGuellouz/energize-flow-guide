# Déploiement VitaFit (GitHub + Vercel + votre Supabase + votre Stripe)

Ce projet ne dépend d'aucun service Lovable en production.

## 1. Base de données (votre projet Supabase)

1. Créez un projet sur supabase.com.
2. SQL Editor → collez et exécutez `supabase/schema.sql`.
3. Authentication → Users → créez votre compte admin (email + mot de passe).
4. SQL Editor :
   ```sql
   insert into public.user_roles (user_id, role)
   values ('<UUID_DE_VOTRE_UTILISATEUR>', 'admin');
   ```

## 2. Stripe

1. Récupérez la clé secrète (`sk_live_…`) dans Developers → API keys.
2. Developers → Webhooks → Add endpoint :
   - URL : `https://www.vitafit-frejus.fr/api/stripe-webhook`
   - Événements : `checkout.session.completed`, `checkout.session.expired`,
     `charge.refunded`
3. Copiez le *Signing secret* (`whsec_…`).

## 3. Variables d'environnement Vercel

| Variable | Valeur | Exposée au navigateur |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_…` | non |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` | non |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | non |
| `SUPABASE_SERVICE_ROLE_KEY` | clé service_role | non |
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` | oui |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | clé anon/publishable | oui |
| `PUBLIC_SITE_URL` | `https://www.vitafit-frejus.fr` | non |

Aucune clé secrète n'est utilisée côté frontend : Stripe et la clé
service_role ne vivent que dans les fonctions `api/`.

## 4. Déploiement

1. Exportez le projet vers GitHub.
2. Sur Vercel : Import Project → framework Vite → build `npm run build`,
   output `dist`.
3. Ajoutez les variables ci-dessus, puis Deploy.

## 5. Test du parcours complet

1. `/reservation` → choisir une date et un créneau → remplir le formulaire.
2. Paiement Stripe (en mode test : carte `4242 4242 4242 4242`).
3. Retour sur `/reservation/confirmation` : le statut passe à *confirmée*
   dès réception du webhook.
4. Rechargez `/reservation` : le créneau réservé n'apparaît plus.
5. `/admin` → connexion avec le compte admin → la réservation est visible,
   et vous pouvez bloquer/libérer des créneaux.

Horaires appliqués partout : lun–ven 8h–18h, sam 8h–13h, dimanche fermé,
séances de 30 min avec créneaux toutes les 15 min.
