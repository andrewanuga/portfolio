// lib/supabaseAdmin.ts — SERVER-ONLY client (service role key, bypasses RLS).
// IMPORTANT: only import this from Route Handlers / server code. It reads
// SUPABASE_SERVICE_ROLE_KEY, which has NO NEXT_PUBLIC_ prefix, so Next.js will
// never bundle it into client JavaScript. Do not import it in a "use client" file.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing Supabase server env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)"
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
