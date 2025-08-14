import type { NextConfig } from "next";
import "./env.ts";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = (() => {
	try {
		return supabaseUrl ? new URL(supabaseUrl).host : undefined;
	} catch {
		return undefined;
	}
})();

const nextConfig: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	trailingSlash: true,
	experimental: {
		reactCompiler: true,
	},
	serverExternalPackages: ["@supabase/supabase-js"],
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	output: "standalone",
	images: {
		remotePatterns: supabaseHost
			? [
					{
						protocol: "https",
						hostname: supabaseHost,
						pathname: "/storage/v1/object/**",
					},
				]
			: [],
	},
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default nextConfig;
