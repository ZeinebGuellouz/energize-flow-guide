CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.inscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'decouverte',
  civilite text,
  nom text,
  prenom text,
  email text,
  telephone text,
  code_postal text,
  invite_par text,
  date_rdv text,
  creneau text,
  objectif text,
  formule text,
  message text,
  sms_accepte text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  emailjs_id text UNIQUE,
  imported boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inscriptions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inscriptions TO authenticated;
GRANT ALL ON public.inscriptions TO service_role;
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit pending inscriptions" ON public.inscriptions FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending' AND imported = false AND emailjs_id IS NULL);
CREATE POLICY "Admins read inscriptions" ON public.inscriptions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inscriptions" ON public.inscriptions FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete inscriptions" ON public.inscriptions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER inscriptions_updated_at BEFORE UPDATE ON public.inscriptions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();