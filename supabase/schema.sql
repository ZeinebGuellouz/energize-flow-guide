-- =====================================================================
-- VitaFit — schéma de réservation en ligne (Supabase / PostgreSQL)
-- À exécuter tel quel dans le SQL Editor de VOTRE projet Supabase.
-- Aucune dépendance à Lovable.
-- =====================================================================

create extension if not exists pgcrypto;

-- ------------------------- Rôles administrateurs ---------------------
do $$ begin
  create type public.app_role as enum ('admin', 'staff');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

drop policy if exists "Users read own roles" on public.user_roles;
create policy "Users read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- ------------------------------ Réservations -------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  product_key text not null default 'discovery_session',
  start_at timestamptz not null,
  end_at timestamptz not null,
  duration_minutes int not null default 30,
  civilite text,
  nom text not null,
  prenom text not null,
  email text not null,
  telephone text not null,
  code_postal text,
  message text,
  amount_cents int not null,
  currency text not null default 'eur',
  status text not null default 'pending',
  stripe_session_id text unique,
  stripe_payment_intent text,
  hold_expires_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_status_check
    check (status in ('pending','paid','cancelled','expired','refunded'))
);

-- Un créneau actif (payé ou en cours de paiement) ne peut exister qu'une fois
create unique index if not exists bookings_unique_active_slot
  on public.bookings (start_at)
  where status in ('pending','paid');

create index if not exists bookings_start_at_idx on public.bookings (start_at);

grant all on public.bookings to service_role;
grant select, update on public.bookings to authenticated;
alter table public.bookings enable row level security;

drop policy if exists "Admins read bookings" on public.bookings;
create policy "Admins read bookings" on public.bookings
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

drop policy if exists "Admins update bookings" on public.bookings;
create policy "Admins update bookings" on public.bookings
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

-- --------------------------- Créneaux bloqués ------------------------
create table if not exists public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blocked_slots_start_at_idx on public.blocked_slots (start_at);

grant all on public.blocked_slots to service_role;
grant select, insert, update, delete on public.blocked_slots to authenticated;
alter table public.blocked_slots enable row level security;

drop policy if exists "Admins manage blocked slots" on public.blocked_slots;
create policy "Admins manage blocked slots" on public.blocked_slots
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

-- ------------------- Journal des événements Stripe -------------------
-- (idempotence des webhooks — réutilisable pour la future boutique Herbalife)
create table if not exists public.stripe_events (
  id text primary key,
  type text not null,
  created_at timestamptz not null default now()
);

grant all on public.stripe_events to service_role;
alter table public.stripe_events enable row level security;

-- --------------------------- updated_at ------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

drop trigger if exists blocked_slots_updated_at on public.blocked_slots;
create trigger blocked_slots_updated_at before update on public.blocked_slots
  for each row execute function public.set_updated_at();

-- =====================================================================
-- Après avoir créé votre compte admin (Authentication > Users) :
-- insert into public.user_roles (user_id, role)
-- values ('<UUID_DE_VOTRE_UTILISATEUR>', 'admin');
-- =====================================================================
