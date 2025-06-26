import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/schemas/supabase";
import { env } from "../env";

export const supabaseServer = async () => {
	const cookieStore = await cookies();
	return createServerClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					for (const cookie of cookiesToSet) {
						cookieStore.set(cookie);
					}
				} catch {}
			},
		},
	});
};
