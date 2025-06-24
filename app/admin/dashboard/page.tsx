import {
	BookOpen,
	Edit,
	FileText,
	FolderOpen,
	LogOut,
	Plus,
} from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import {
	getAllPosts,
	getAllProjects,
	getAllPublications,
} from "@/utils/admin-data";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
	const [posts, projects, publications] = await Promise.all([
		getAllPosts(),
		getAllProjects(),
		getAllPublications(),
	]);

	return (
		<PageLayout>
			<main className="py-8">
				<header className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-foreground">
						Admin Dashboard
					</h1>
					<form action={logout}>
						<Button
							variant="outline"
							size="sm"
							type="submit"
							aria-label="Logout from admin panel"
						>
							<LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
							Logout
						</Button>
					</form>
				</header>

				<section aria-labelledby="stats-heading">
					<h2 id="stats-heading" className="sr-only">
						Content Statistics
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<article className="bg-card p-6 rounded-lg border border-border">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-medium text-muted-foreground">
										Blog Posts
									</h3>
									<p className="text-2xl font-bold text-foreground">
										{posts.length}
									</p>
								</div>
								<div
									className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg"
									aria-hidden="true"
								>
									<FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
								</div>
							</div>
							<div className="mt-4 space-y-2">
								<Link href="/admin/dashboard/add">
									<Button size="sm" className="w-full">
										<Plus className="w-4 h-4 mr-2" aria-hidden="true" />
										Add Post
									</Button>
								</Link>
								<Link href="/admin/dashboard/update">
									<Button variant="outline" size="sm" className="w-full">
										<Edit className="w-4 h-4 mr-2" aria-hidden="true" />
										Edit Posts
									</Button>
								</Link>
							</div>
						</article>

						<article className="bg-card p-6 rounded-lg border border-border">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-medium text-muted-foreground">
										Projects
									</h3>
									<p className="text-2xl font-bold text-foreground">
										{projects.length}
									</p>
								</div>
								<div
									className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg"
									aria-hidden="true"
								>
									<FolderOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
								</div>
							</div>
							<div className="mt-4">
								<Button
									size="sm"
									className="w-full"
									disabled
									aria-label="Add project (coming soon)"
								>
									<Plus className="w-4 h-4 mr-2" aria-hidden="true" />
									Add Project
								</Button>
							</div>
						</article>

						<article className="bg-card p-6 rounded-lg border border-border">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-medium text-muted-foreground">
										Publications
									</h3>
									<p className="text-2xl font-bold text-foreground">
										{publications.length}
									</p>
								</div>
								<div
									className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg"
									aria-hidden="true"
								>
									<BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
								</div>
							</div>
							<div className="mt-4">
								<Button
									size="sm"
									className="w-full"
									disabled
									aria-label="Add publication (coming soon)"
								>
									<Plus className="w-4 h-4 mr-2" aria-hidden="true" />
									Add Publication
								</Button>
							</div>
						</article>
					</div>
				</section>

				<section aria-labelledby="recent-posts-heading">
					<div className="bg-card p-6 rounded-lg border border-border">
						<h2
							id="recent-posts-heading"
							className="text-xl font-semibold text-foreground mb-4"
						>
							Recent Posts
						</h2>
						{posts.length === 0 ? (
							<div>
								<p className="text-muted-foreground">
									No posts yet.{" "}
									<Link
										href="/admin/dashboard/add"
										className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
									>
										Create your first post
									</Link>
									.
								</p>
							</div>
						) : (
							<div className="space-y-3">
								{posts.slice(0, 5).map((post) => (
									<article
										key={post.id}
										className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
									>
										<div>
											<h3 className="font-medium text-foreground">
												{post.title}
											</h3>
											<p className="text-sm text-muted-foreground">
												<time dateTime={post.date}>
													{new Date(post.date).toLocaleDateString()}
												</time>{" "}
												• {post.published ? "Published" : "Draft"}
											</p>
										</div>
										<Link href={`/admin/dashboard/update/${post.id}`}>
											<Button
												variant="outline"
												size="sm"
												aria-label={`Edit post: ${post.title}`}
											>
												<Edit className="w-4 h-4" aria-hidden="true" />
											</Button>
										</Link>
									</article>
								))}
							</div>
						)}
					</div>
				</section>
			</main>
		</PageLayout>
	);
}
