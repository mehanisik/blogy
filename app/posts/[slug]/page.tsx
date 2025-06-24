import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/markdown";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/utils/data";
import { formatDate } from "@/utils/date";

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const resolvedParams = await params;
	const post = await getPostBySlug(resolvedParams.slug);
	return {
		title: post.title,
		description: post.subtitle || post.content.slice(0, 160),
		openGraph: {
			title: post.title,
			description: post.subtitle || post.content.slice(0, 160),
			type: "article",
			publishedTime: post.date,
			authors: ["Mehmet ISIK"],
			tags: post.tags || [],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.subtitle || post.content.slice(0, 160),
		},
		alternates: {
			canonical: `/posts/${resolvedParams.slug}`,
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const resolvedParams = await params;
	const post = await getPostBySlug(resolvedParams.slug);

	return (
		<PageLayout>
			<main className="py-8 sm:py-12 lg:py-16 w-full">
				<nav aria-label="Breadcrumb navigation">
					<Button variant="outline" asChild className="text-sm">
						<Link href="/posts" aria-label="Go back to all posts">
							<ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
							<span className="ml-1 sm:ml-2">Back to Posts</span>
						</Link>
					</Button>
				</nav>

				<article className="space-y-3 sm:space-y-4 my-4 sm:my-6">
					<header className="mb-8 sm:mb-12">
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
							{post.title}
						</h1>

						{post.subtitle && (
							<p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
								{post.subtitle}
							</p>
						)}

						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 gap-2 sm:gap-0">
							<div className="flex items-center space-x-2 sm:space-x-4">
								<time dateTime={post.date}>{formatDate(post.date)}</time>
								{post.read_time && <span>• {post.read_time} min read</span>}
							</div>
						</div>
					</header>

					<div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
						<Markdown content={post.content} />
					</div>

					{post.tags && post.tags.length > 0 && (
						<footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
							<h2 className="sr-only">Article Tags</h2>
							<div className="flex flex-wrap gap-2 sm:gap-3">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-muted text-muted-foreground rounded-full font-medium hover:bg-muted/80 transition-colors"
									>
										{tag}
									</span>
								))}
							</div>
						</footer>
					)}
				</article>

				<nav
					className="mt-8 sm:mt-12 flex justify-between"
					aria-label="Post navigation"
				>
					<Button variant="outline" asChild className="text-sm">
						<Link href="/posts" aria-label="View all blog posts">
							← All Posts
						</Link>
					</Button>
				</nav>
			</main>
		</PageLayout>
	);
}
