import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/get-base-url";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/admin/",
		},
		sitemap: `${getBaseUrl()}/sitemap.xml`,
	};
}
