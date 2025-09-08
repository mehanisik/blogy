import type { Metadata } from "next";
import { Suspense } from "react";
import PublicationsLoader from "@/components/loaders/publications-loader";
import { PublicationsList } from "@/components/publications/publications-list";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";
import { getPublications } from "@/utils/helpers/queries";

export const metadata: Metadata = {
	title: "Publications",
	description: `Research and publications by ${siteConfig.seo.authorName}.`,
	alternates: { canonical: `${getBaseUrl()}/publications` },
	openGraph: {
		title: "Publications",
		description: `Research and publications by ${siteConfig.seo.authorName}.`,
		url: `${getBaseUrl()}/publications`,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: "Publications",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Publications",
		description: `Research and publications by ${siteConfig.seo.authorName}.`,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

export default async function PublicationsPage() {
	const publications = await getPublications();

	return (
		<Suspense fallback={<PublicationsLoader />}>
			<PublicationsList publications={publications} />
		</Suspense>
	);
}
