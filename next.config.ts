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

const _withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	trailingSlash: true,
	serverExternalPackages: ["@supabase/supabase-js"],
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	images: {
		remotePatterns: [
			...(supabaseHost
				? [
						{
							protocol: "https" as const,
							hostname: supabaseHost,
							pathname: "/storage/v1/object/**",
						},
					]
				: []),
			{
				protocol: "https" as const,
				hostname: "img.shields.io",
			},
			{
				protocol: "https" as const,
				hostname: "github.com",
			},
			{
				protocol: "https" as const,
				hostname: "raw.githubusercontent.com",
			},
			{
				protocol: "https" as const,
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https" as const,
				hostname: "images.unsplash.com",
			},
		],
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default _withBundleAnalyzer(nextConfig);
