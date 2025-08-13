import type { Metadata } from "next";
import { Suspense } from "react";
import { PostsList } from "@/components/blog/posts-list";
import PostsLoader from "@/components/loaders/posts-loader";
import { env } from "@/env";
import { siteConfig } from "@/siteconfig";
import { getPosts } from "@/utils/helpers/queries";

export const metadata: Metadata = {
	title: "Blog Posts",
	description: `Articles by ${siteConfig.seo.authorName} on React, TypeScript, Next.js, and full-stack development.`,
	alternates: { canonical: `${env.NEXT_PUBLIC_BASE_URL}/posts` },
	openGraph: {
		title: "Blog Posts",
		description: `Articles by ${siteConfig.seo.authorName} on React, TypeScript, Next.js, and full-stack development.`,
		url: `${env.NEXT_PUBLIC_BASE_URL}/posts`,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: "Blog Posts",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog Posts",
		description: `Articles by ${siteConfig.seo.authorName} on React, TypeScript, Next.js, and full-stack development.`,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

export default async function PostsPage() {
	const posts = await getPosts();

	return (
		<Suspense fallback={<PostsLoader />}>
			<PostsList posts={posts} />
		</Suspense>
	);
}
