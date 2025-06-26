import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production"]),
		NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
		NEXT_PUBLIC_PROJECT_NAME: z.string(),
		NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
	},

	emptyStringAsUndefined: false,
	extends: [vercel()],
	runtimeEnv: {
		NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		NEXT_PUBLIC_PROJECT_NAME: process.env.NEXT_PUBLIC_PROJECT_NAME,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
	},
	server: {
		SUPABASE_URL: z.string().url(),
		SUPABASE_ANON_KEY: z.string().min(1),
		WAKATIME_API_KEY: z.string().optional(),
	},
});
