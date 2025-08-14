import type { Metadata } from "next";
import { HomeGrid } from "@/components/home/home-grid";
import { env } from "@/env";
import { siteConfig } from "@/siteconfig";

export const metadata: Metadata = {
	title: "Home",
	description: siteConfig.seo.description,
	alternates: { canonical: env.NEXT_PUBLIC_BASE_URL },
	openGraph: {
		title: siteConfig.seo.defaultTitle,
		description: siteConfig.seo.description,
		url: env.NEXT_PUBLIC_BASE_URL,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: siteConfig.seo.openGraph.imageAlt,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.seo.defaultTitle,
		description: siteConfig.seo.description,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

export const dynamic = "force-dynamic";

export default function Home() {
	return <HomeGrid />;
}
