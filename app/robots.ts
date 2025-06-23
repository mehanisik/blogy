import env from "@/utils/env";

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/api"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/admin"],
			},
		],
		sitemap: `${env.BASE_URL}/sitemap.xml`,
		host: env.BASE_URL,
	};
}
