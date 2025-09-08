import type { Metadata } from "next";
import TrackerSection from "@/components/tracker/tracker-section";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";

export const metadata: Metadata = {
	title: "Activity Tracker",
	description: `Coding activity insights and time tracking by ${siteConfig.seo.authorName} powered by WakaTime.`,
	alternates: { canonical: `${getBaseUrl()}/tracker` },
	openGraph: {
		title: "Activity Tracker",
		description: `Coding activity insights and time tracking by ${siteConfig.seo.authorName} powered by WakaTime.`,
		url: `${getBaseUrl()}/tracker`,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: "Activity Tracker",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Activity Tracker",
		description: `Coding activity insights and time tracking by ${siteConfig.seo.authorName} powered by WakaTime.`,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

export default async function TrackerPage() {
	return <TrackerSection />;
}
