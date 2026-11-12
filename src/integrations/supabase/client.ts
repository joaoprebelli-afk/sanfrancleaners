import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://mtmfqzsokqykgvodmsdf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_XY2si1LbDTD887qKTTJHCg_sDeGBZMi";

// The site only inserts leads and uploads photos. No user sessions, so nothing is persisted.
// This also keeps the module safe to import during the build-time prerender (no localStorage there).
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
