import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PublicationDetailLoader from "@/components/loaders/publication-detail-loader";
import { PublicationDetail } from "@/components/publications/publication-detail";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";
import { getPublicationById } from "@/utils/helpers/queries";

export async function generateMetadata(props: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await props.params;
	const idNum = Number(id);
	const url = `${getBaseUrl()}/publications/${id}`;
	if (Number.isNaN(idNum)) {
		return {
			title: "Publication",
			description: siteConfig.seo.description,
			alternates: { canonical: url },
		};
	}
	const publication = await getPublicationById(idNum);

	const title = publication?.title ?? "Publication";
	const description = publication?.description ?? siteConfig.seo.description;
	const ogImage =
		publication?.cover_image ?? siteConfig.seo.openGraph.imagePath;

	return {
		title,
		description,
		keywords: publication?.keywords ?? siteConfig.seo.keywords,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
			site: siteConfig.seo.twitter.site,
			creator: siteConfig.seo.twitter.creator,
		},
	};
}

export default async function PublicationDetailPage(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await props.params;
	const idNum = Number(id);
	if (Number.isNaN(idNum)) {
		return notFound();
	}
	const publication = await getPublicationById(idNum);

	if (!publication) {
		return notFound();
	}

	return (
		<Suspense fallback={<PublicationDetailLoader />}>
			<PublicationDetail publication={publication} />
		</Suspense>
	);
}
