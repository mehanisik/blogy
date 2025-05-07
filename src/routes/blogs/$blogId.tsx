import { PageLayout } from "@/components/layout/page-layout";
import Mardown from "@/components/mardown";
import { fetchBlogById } from "@/services";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs/$blogId")({
	loader: async ({ params: { blogId } }) => {
		if (!blogId) {
			throw new Error("Blog ID is required");
		}
		const post = await fetchBlogById({ data: Number(blogId) });
		if (!post) {
			throw new Error("Blog not found");
		}
		return { post };
	},
	component: BlogPostPage,
});

function BlogPostPage() {
	const { post } = Route.useLoaderData();
	const formatDate = (dateString?: string) => {
		if (dateString) {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(date);
		}
	};

	const getDescription = () => {
		if (!post?.content) return "Read this insightful blog post";
		const plainText = post.content.replace(/<[^>]*>/g, "");
		return plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");
	};

	return (
		<PageLayout
			title={post?.title || "Blog Post"}
			description={getDescription()}
		>
			<main>
				<nav aria-label="Breadcrumb">
					<Link
						to="/blogs"
						className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline mb-6 inline-block transition-colors duration-200"
						aria-label="Back to all blog posts"
					>
						← Back to all posts
					</Link>
				</nav>

				<article className="blog-post">
					<header>
						<h1 className="text-4xl font-bold tracking-tight mt-4 mb-3 text-gray-900 dark:text-gray-100">
							{post?.title}
						</h1>
						<div
							className="text-sm text-gray-600 dark:text-gray-400 mb-8"
							aria-label="Post metadata"
						>
							<time dateTime={post?.date}>{formatDate(post?.date)}</time>
							{post?.tags && (
								<div className="mt-2">
									<span className="sr-only">Tags:</span>
									<ul className="inline-flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<li key={tag} className="inline">
												<span className="tag">{tag.trim()}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</header>

					<div
						className="prose dark:prose-invert max-w-none"
						aria-label="Blog post content"
					>
						<Mardown content={post?.content || ""} />
					</div>
				</article>
			</main>
		</PageLayout>
	);
}
