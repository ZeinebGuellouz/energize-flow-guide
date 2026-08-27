import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase du site (clé publique).
 * Indépendant de tout hébergeur : configurez simplement, sur Vercel,
 *   VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY (ou VITE_SUPABASE_ANON_KEY).
 */
const url =
  import.meta.env.VITE_SUPABASE_URL ??
  (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined) ??
  "";

const anonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  "";

export const isDbConfigured = Boolean(url && anonKey);

export const db = createClient(url || "http://localhost", anonKey || "public-anon-key", {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: "vitafit-auth" },
});
