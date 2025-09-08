import type { Metadata } from "next";
import { Suspense } from "react";
import TermsSection from "@/components/legal/terms-section";
import TermsLoader from "@/components/loaders/terms-loader";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";

export const metadata: Metadata = {
	title: "Terms of Service",
	description: `Terms and conditions for using ${siteConfig.seo.siteName}.`,
	alternates: { canonical: `${getBaseUrl()}/legal/terms` },
	openGraph: {
		title: "Terms of Service",
		description: `Terms and conditions for using ${siteConfig.seo.siteName}.`,
		url: `${getBaseUrl()}/legal/terms`,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: "Terms of Service",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Terms of Service",
		description: `Terms and conditions for using ${siteConfig.seo.siteName}.`,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

export default function TermsPage() {
	return (
		<Suspense fallback={<TermsLoader />}>
			<TermsSection />
		</Suspense>
	);
}
