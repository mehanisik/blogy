import type { Metadata } from "next";
import { Suspense } from "react";
import PublicationsLoader from "@/components/loaders/publications-loader";
import { PublicationsList } from "@/components/publications/publications-list";
import { env } from "@/env";
import { siteConfig } from "@/siteconfig";
import { getPublications } from "@/utils/helpers/queries";

export const metadata: Metadata = {
	title: "Publications",
	description: `Research and publications by ${siteConfig.seo.authorName}.`,
	alternates: { canonical: `${env.NEXT_PUBLIC_BASE_URL}/publications` },
	openGraph: {
		title: "Publications",
		description: `Research and publications by ${siteConfig.seo.authorName}.`,
		url: `${env.NEXT_PUBLIC_BASE_URL}/publications`,
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
