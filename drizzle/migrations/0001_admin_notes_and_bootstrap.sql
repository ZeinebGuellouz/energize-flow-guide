ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS notes text;

CREATE OR REPLACE FUNCTION public.grant_vitafit_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'zeineb.guellouz@medtech.tn' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.grant_vitafit_admin() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_vitafit_admin ON auth.users;
CREATE TRIGGER on_auth_user_vitafit_admin AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_vitafit_admin();