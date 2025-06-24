import { z } from "zod";

const envSchema = z.object({
	NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
	NEXT_PUBLIC_PORT: z.coerce.number().default(3000),
	NEXT_PUBLIC_NODE_ENV: z
		.enum(["development", "production"])
		.default("development"),
	NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
	WAKATIME_API_KEY: z.string().optional(),
	GITHUB_TOKEN: z.string().optional(),
	GITHUB_USERNAME: z.string().optional(),
});

const envConfig = envSchema.parse({
	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
	NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
	GITHUB_TOKEN: process.env.GITHUB_TOKEN,
	GITHUB_USERNAME: process.env.GITHUB_USERNAME,
});

const env = {
	BASE_URL: envConfig.NEXT_PUBLIC_BASE_URL,
	PORT: envConfig.NEXT_PUBLIC_PORT,
	NODE_ENV: envConfig.NEXT_PUBLIC_NODE_ENV,
	SUPABASE_URL: envConfig.NEXT_PUBLIC_SUPABASE_URL,
	SUPABASE_ANON_KEY: envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	WAKATIME_API_KEY: envConfig.WAKATIME_API_KEY,
	GITHUB_TOKEN: envConfig.GITHUB_TOKEN,
	GITHUB_USERNAME: envConfig.GITHUB_USERNAME,
};

export default env;
