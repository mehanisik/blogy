import type { NextConfig } from "next";

import "./env.ts";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	trailingSlash: true,
	experimental: {
		reactCompiler: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "random.imagecdn.app",
			},
			{
				protocol: "https",
				hostname: "github.com",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
		],
	},
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default nextConfig;
