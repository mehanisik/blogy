import type { KnipConfig } from "knip";

const config: KnipConfig = {
	biome: true,
	typescript: true,
	ignoreDependencies: ["tailwindcss", "tw-animate-css", "vercel"],
	ignore: [
		"components/ui/**/*",
		".next/**/*",
		"node_modules/**/*",
		"reset.d.ts",
		"next-env.d.ts",
		"supabase/migrations/**/*",
		"types/supabase.ts",
		"env.ts",
	],
};
export default config;
