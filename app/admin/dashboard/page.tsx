import {
	BookOpen,
	Edit,
	FileText,
	FolderOpen,
	LogOut,
	Plus,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageLayout } from "@/components/page-layout";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	getAllPosts,
	getAllProjects,
	getAllPublications,
} from "@/utils/admin-data";
import { supabaseServer } from "@/utils/supabase-server";
import { deletePost, logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
	const supabase = await supabaseServer();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect("/admin");
	}

	const [posts, projects, publications] = await Promise.all([
		getAllPosts(),
		getAllProjects(),
		getAllPublications(),
	]);

	const onDeletePost = async (postId: string) => {
		"use server";
		await deletePost(postId);
	};

	return (
		<PageLayout>
			<main className="py-8">
				<header className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-foreground">
							Admin Dashboard
						</h1>
						<p className="text-muted-foreground mt-1">
							Welcome back, {user.email}
						</p>
					</div>
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
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Blog Posts
								</CardTitle>
								<div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
									<FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
								</div>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{posts.length}</div>
								<p className="text-xs text-muted-foreground">
									{posts.filter((p) => p.published).length} published
								</p>
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
											Manage Posts
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Projects</CardTitle>
								<div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
									<FolderOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
								</div>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{projects.length}</div>
								<p className="text-xs text-muted-foreground">
									{projects.filter((p) => p.featured).length} featured
								</p>
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
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Publications
								</CardTitle>
								<div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
									<BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />
								</div>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{publications.length}</div>
								<p className="text-xs text-muted-foreground">
									Total publications
								</p>
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
							</CardContent>
						</Card>
					</div>
				</section>

				<section aria-labelledby="recent-posts-heading">
					<Card>
						<CardHeader>
							<CardTitle>Recent Posts</CardTitle>
							<CardDescription>
								Manage your blog posts and their publication status
							</CardDescription>
						</CardHeader>
						<CardContent>
							{posts.length === 0 ? (
								<div className="text-center py-8">
									<FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
									<p className="text-muted-foreground mb-4">No posts yet.</p>
									<Link href="/admin/dashboard/add">
										<Button>
											<Plus className="w-4 h-4 mr-2" />
											Create your first post
										</Button>
									</Link>
								</div>
							) : (
								<div className="space-y-4">
									{posts.slice(0, 10).map((post) => (
										<article
											key={post.id}
											className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
										>
											<div className="flex-1">
												<h3 className="font-medium text-foreground">
													{post.title}
												</h3>
												<p className="text-sm text-muted-foreground">
													<time dateTime={post.date}>
														{new Date(post.date).toLocaleDateString()}
													</time>{" "}
													• {post.published ? "Published" : "Draft"}
													{post.read_time && ` • ${post.read_time} min read`}
												</p>
											</div>
											<div className="flex items-center gap-2">
												<Link href={`/admin/dashboard/update/${post.id}`}>
													<Button
														variant="outline"
														size="sm"
														aria-label={`Edit post: ${post.title}`}
													>
														<Edit className="w-4 h-4" aria-hidden="true" />
													</Button>
												</Link>
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button
															variant="outline"
															size="sm"
															aria-label={`Delete post: ${post.title}`}
														>
															<Trash2 className="w-4 h-4 text-destructive" />
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>Delete Post</AlertDialogTitle>
															<AlertDialogDescription>
																Are you sure you want to delete "{post.title}"?
																This action cannot be undone.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Cancel</AlertDialogCancel>
															<AlertDialogAction
																onClick={() => onDeletePost(`${post.id}`)}
																className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
															>
																Delete
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</div>
										</article>
									))}
									{posts.length > 10 && (
										<div className="text-center pt-4">
											<Link href="/admin/dashboard/update">
												<Button variant="outline">View All Posts</Button>
											</Link>
										</div>
									)}
								</div>
							)}
						</CardContent>
					</Card>
				</section>
			</main>
		</PageLayout>
	);
}
