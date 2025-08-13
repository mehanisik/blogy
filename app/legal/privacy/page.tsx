import type { Metadata } from "next";
import { Suspense } from "react";
import PrivacySection from "@/components/legal/privacy-section";
import PrivacyLoader from "@/components/loaders/privacy-loader";
import { env } from "@/env";
import { siteConfig } from "@/siteconfig";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: `Privacy practices and data usage at ${siteConfig.seo.siteName}.`,
	alternates: { canonical: `${env.NEXT_PUBLIC_BASE_URL}/legal/privacy` },
	openGraph: {
		title: "Privacy Policy",
		description: `Privacy practices and data usage at ${siteConfig.seo.siteName}.`,
		url: `${env.NEXT_PUBLIC_BASE_URL}/legal/privacy`,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: "Privacy Policy",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Privacy Policy",
		description: `Privacy practices and data usage at ${siteConfig.seo.siteName}.`,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

export default function PrivacyPage() {
	return (
		<Suspense fallback={<PrivacyLoader />}>
			<PrivacySection />
		</Suspense>
	);
}
