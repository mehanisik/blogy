import PageLayout from "@/components/layout/page-layout";
import ListCard from "@/components/list-card";
import { PendingComponent } from "@/components/pending-component";
import { fetchBlogs } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blogs/")({
	loader: () => fetchBlogs(),
	pendingComponent: () => (
		<PendingComponent title="Blogs" className="flex flex-col gap-5" />
	),
	component: BlogPage,
});

function BlogPage() {
	const blogs = Route.useLoaderData();
	return (
		<PageLayout title="Blogs">
			<article className="flex flex-col gap-5">
				{blogs
					.filter((blog) => blog.published)
					.map((blog) => (
						<ListCard
							key={blog.id}
							title={blog.title}
							date={new Date(blog.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
							description={
								blog.content.substring(0, 150) +
								(blog.content.length > 150 ? "..." : "")
							}
							tags={blog.tags || []}
							rightAction={
								<Link
									to="/blogs/$blogId"
									params={{ blogId: `${blog.id}` }}
									className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
								>
									<ArrowUpRight className="h-5 w-5" />
								</Link>
							}
						/>
					))}
			</article>
		</PageLayout>
	);
}
