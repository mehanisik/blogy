import Link from "next/link";
import { Markdown } from "@/components/markdown";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/utils/data";
import { formatDate } from "@/utils/date";

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = await params;

	const post = await getPostBySlug(resolvedParams.slug);

	if (!post) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
					Post not found
				</h1>
			</div>
		);
	}

	return (
		<PageLayout>
			<div className="py-16 w-full">
				<div className="mb-8">
					<Button variant="outline" asChild>
						<Link href="/posts">← Back to Posts</Link>
					</Button>
				</div>

				<header className="mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
						{post.title}
					</h1>

					{post.subtitle && (
						<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
							{post.subtitle}
						</p>
					)}

					<div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-8">
						<div className="flex items-center space-x-4">
							<span>{formatDate(post.date)}</span>
							{post.read_time && <span>• {post.read_time} min read</span>}
						</div>
					</div>
				</header>

				<Markdown content={post.content} />

				{post.tags && post.tags.length > 0 && (
					<footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
						<div className="flex flex-wrap gap-3">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
								>
									{tag}
								</span>
							))}
						</div>
					</footer>
				)}

				<div className="mt-12 flex justify-between">
					<Button variant="outline" asChild>
						<Link href="/posts">← All Posts</Link>
					</Button>
				</div>
			</div>
		</PageLayout>
	);
}
