import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PostContent } from "@/components/blog/post-content";
import { ViewIncrementer } from "@/components/blog/view-incrementer";
import PostDetailLoader from "@/components/loaders/post-detail-loader";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";
import { getPostById, getPostBySlug } from "@/utils/helpers/queries";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await props.params;
	const url = `${getBaseUrl()}/posts/${slug}`;

	const isId = !isNaN(parseInt(slug, 10));
	const post = await (isId
		? getPostById(parseInt(slug, 10))
		: getPostBySlug(slug));

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

	const isId = !isNaN(parseInt(slug, 10));
	const post = await (isId
		? getPostById(parseInt(slug, 10))
		: getPostBySlug(slug));

	if (!post) {
		return notFound();
	}

	return (
		<Suspense fallback={<PostDetailLoader />}>
			{post.slug && <ViewIncrementer slug={post.slug} />}
			<PostContent post={post} />
		</Suspense>
	);
}
