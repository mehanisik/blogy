import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/env";
import type { Database } from "@/types/supabase";

export const supabaseClient = createBrowserClient<Database>(
	env.NEXT_PUBLIC_SUPABASE_URL,
	env.SUPABASE_ANON_KEY,
);
