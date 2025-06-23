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
	const posts = await getAllPosts();
	const projects = await getAllProjects();
	const publications = await getAllPublications();

	return (
		<PageLayout>
			<div className="py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						Admin Dashboard
					</h1>
					<form action={logout}>
						<Button variant="outline" size="sm" type="submit">
							<LogOut className="w-4 h-4 mr-2" />
							Logout
						</Button>
					</form>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Blog Posts
								</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
									{posts.length}
								</p>
							</div>
							<div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
								<FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
							</div>
						</div>
						<div className="mt-4 space-y-2">
							<Link href="/admin/dashboard/add">
								<Button size="sm" className="w-full">
									<Plus className="w-4 h-4 mr-2" />
									Add Post
								</Button>
							</Link>
							<Link href="/admin/dashboard/update">
								<Button variant="outline" size="sm" className="w-full">
									<Edit className="w-4 h-4 mr-2" />
									Edit Posts
								</Button>
							</Link>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Projects
								</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
									{projects.length}
								</p>
							</div>
							<div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
								<FolderOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
							</div>
						</div>
						<div className="mt-4">
							<Button size="sm" className="w-full" disabled>
								<Plus className="w-4 h-4 mr-2" />
								Add Project
							</Button>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Publications
								</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
									{publications.length}
								</p>
							</div>
							<div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
								<BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
							</div>
						</div>
						<div className="mt-4">
							<Button size="sm" className="w-full" disabled>
								<Plus className="w-4 h-4 mr-2" />
								Add Publication
							</Button>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
						Recent Posts
					</h2>
					{posts.length === 0 ? (
						<p className="text-gray-500 dark:text-gray-400">
							No posts yet.{" "}
							<Link
								href="/admin/dashboard/add"
								className="text-blue-600 dark:text-blue-400 hover:underline"
							>
								Create your first post
							</Link>
							.
						</p>
					) : (
						<div className="space-y-3">
							{posts.slice(0, 5).map((post) => (
								<div
									key={post.id}
									className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
								>
									<div>
										<h3 className="font-medium text-gray-900 dark:text-gray-100">
											{post.title}
										</h3>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{new Date(post.date).toLocaleDateString()} •{" "}
											{post.published ? "Published" : "Draft"}
										</p>
									</div>
									<Link href={`/admin/dashboard/update/${post.id}`}>
										<Button variant="outline" size="sm">
											<Edit className="w-4 h-4" />
										</Button>
									</Link>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</PageLayout>
	);
}
