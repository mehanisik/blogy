import { PageLayout } from "@/components/layout/page-layout";
import ListCard from "@/components/list-card";
import { PendingComponent } from "@/components/pending-component";
import { fetchBlogsFn } from "@/services/blog";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs/")({
	loader: () => fetchBlogsFn(),
	pendingComponent: PendingComponent,
	component: BlogPage,
});

function BlogPage() {
	const blogs = Route.useLoaderData();
	return (
		<PageLayout
			title="Blog Posts"
			description="Explore my collection of blog posts related to software engineering, programming, and my personal experiences as a software engineer. Stay updated with my latest thoughts and ideas."
		>
			<main>
				<h1 className="sr-only">Blog Posts</h1>
				<article className="flex flex-col gap-5" aria-label="Blog posts list">
					{blogs?.length === 0 && (
						<section
							className="flex flex-col gap-2"
							aria-label="No posts message"
						>
							<p
								className="text-gray-500 dark:text-gray-400"
								aria-live="polite"
							>
								I haven't written any blogs yet. I'll write some soon! 🤞
							</p>
						</section>
					)}
					{blogs
						?.filter((blog) => blog.published)
						.map((blog) => (
							<section
								key={blog.id}
								className="blog-post"
								aria-labelledby={`blog-title-${blog.id}`}
							>
								<ListCard
									key={blog.id}
									title={blog.title}
									date={new Date(blog.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
									tags={blog.tags || []}
									type="blog"
									link=""
									blogId={blog.id}
									aria-label={`Read blog post: ${blog.title}`}
								/>
							</section>
						))}
				</article>
			</main>
		</PageLayout>
	);
}
