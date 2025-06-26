import { Edit } from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/utils/admin-data";

export const dynamic = "force-dynamic";

export default async function UpdatePostPage() {
	const posts = await getAllPosts();

	return (
		<PageLayout>
			<main className="py-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-3">
						Update Posts
					</h1>
					<p className="text-muted-foreground">Select a post to edit.</p>
				</header>

				{posts.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-muted-foreground">No posts available to edit.</p>
						<Link href="/admin/dashboard/add">
							<Button className="mt-4">Create First Post</Button>
						</Link>
					</div>
				) : (
					<div className="space-y-4">
						{posts.map((post) => (
							<div
								key={post.id}
								className="bg-card p-6 rounded-lg border border-border"
							>
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-medium text-foreground">
											{post.title}
										</h3>
										<p className="text-sm text-muted-foreground mt-1">
											Slug: {post.slug}
										</p>
										<p className="text-sm text-muted-foreground">
											Published: {post.published ? "Yes" : "No"} • Date:{" "}
											{new Date(post.date).toLocaleDateString()}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<Link href={`/admin/dashboard/update/${post.id}`}>
											<Button variant="outline" size="sm">
												<Edit className="w-4 h-4 mr-2" />
												Edit
											</Button>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</PageLayout>
	);
}
