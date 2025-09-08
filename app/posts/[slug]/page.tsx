import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PostContent } from "@/components/blog/post-content";
import PostDetailLoader from "@/components/loaders/post-detail-loader";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";
import { getPostById } from "@/utils/helpers/queries";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await props.params;
	const url = `${getBaseUrl()}/posts/${slug}`;
	const idNum = Number(slug);
	if (Number.isNaN(idNum)) {
		return {
			title: "Blog Post",
			description: siteConfig.seo.description,
			alternates: { canonical: url },
		};
	}
	const post = await getPostById(idNum);

	const title = post?.title ?? "Blog Post";
	const description = post?.subtitle ?? siteConfig.seo.description;
	const ogImage = post?.cover_image ?? siteConfig.seo.openGraph.imagePath;
	const keywords = post?.tags ?? siteConfig.seo.keywords;

	return {
		title,
		description,
		keywords,
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

export default async function PostSlugPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await props.params;

	const post = await getPostById(Number(slug));

	if (!post) {
		return notFound();
	}

	return (
		<Suspense fallback={<PostDetailLoader />}>
			<PostContent post={post} />
		</Suspense>
	);
}
