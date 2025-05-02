import Layout from "@/components/layout/layout";
import ListCard from "@/components/list-card";
import { fetchBlogs } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blogs/")({
	loader: () => fetchBlogs(),
	component: BlogPage,
});

function BlogPage() {
	const blogs = Route.useLoaderData();
	return (
		<Layout>
			<div className="py-8">
				<h1 className="text-2xl font-medium mb-6">Blog</h1>

				<div className="space-y-8">
					{blogs.length === 0 ? (
						<p className="text-gray-500">No blog posts yet.</p>
					) : (
						blogs
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
							))
					)}
				</div>
			</div>
		</Layout>
	);
}
