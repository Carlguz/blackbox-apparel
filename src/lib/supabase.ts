import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client.
 *
 * Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable
 * cloud persistence. If not set, the app falls back to local SQLite via Prisma.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseServiceKey.length > 0;

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });
  }
  return _client;
}

/**
 * Storage bucket name for uploaded images.
 * Create this bucket in Supabase Dashboard → Storage.
 */
export const STORAGE_BUCKET = "blackbox-uploads";
