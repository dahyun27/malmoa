import { createBrowserClient } from "@supabase/ssr";
import { getPublicSupabaseEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
  const { supabaseAnonKey, supabaseUrl } = getPublicSupabaseEnv();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
