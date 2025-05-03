import { PageLayout } from "@/components/layout/page-layout";
import { MarkdownEditor } from "@/components/markdown-editor";
import {
	checkAuth,
	createBlog,
	deleteBlog,
	fetchBlogs,
	signOut,
	updateBlog,
} from "@/services";
import type { Blog, BlogInsert, BlogUpdate } from "@/types/database.types";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authed/admin")({
	component: RouteComponent,
	loader: async () => {
		const result = await checkAuth();

		if (!result.authenticated) {
			throw redirect({
				to: "/sign-in",
				search: {
					redirect: "/admin",
				},
			});
		}

		const blogs = await fetchBlogs();
		return {
			user: result.user || null,
			isAuthenticated: result.authenticated,
			blogs,
		};
	},
});

function RouteComponent() {
	const { blogs } = Route.useLoaderData();
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
	const [isPublished, setIsPublished] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	useEffect(() => {
		if (selectedBlog) {
			setTitle(selectedBlog.title);
			setContent(selectedBlog.content);
			setIsPublished(selectedBlog.published);
			setIsEditing(true);
		} else {
			setTitle("");
			setContent("");
			setIsPublished(false);
		}
	}, [selectedBlog]);

	const handleLogout = async () => {
		try {
			await signOut();
			navigate({ to: "/sign-in", search: { redirect: undefined } });
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const handleDeleteBlog = async (id: number) => {
		try {
			await deleteBlog({ data: id });
			setSelectedBlog(null);
			setIsEditing(false);
		} catch (error) {
			console.error("Failed to delete blog:", error);
		}
	};

	const handleSaveBlog = async () => {
		try {
			if (selectedBlog) {
				const updatedBlog: BlogUpdate = {
					title,
					content,
					published: isPublished,
				};
				await updateBlog({ data: { id: selectedBlog.id, blog: updatedBlog } });
			} else {
				const newBlog: BlogInsert = {
					title,
					content,
					published: isPublished,
					date: new Date().toISOString(),
				};
				await createBlog({ data: newBlog });
			}
			setSelectedBlog(null);
			setIsEditing(false);
		} catch (error) {
			console.error("Failed to save blog:", error);
		}
	};

	return (
		<PageLayout title="Admin Panel" description="Admin Panel">
			{!isEditing ? (
				<>
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">
							Admin Panel
						</h1>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => setIsEditing(true)}
								className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
							>
								<Plus className="h-3.5 w-3.5" />
								New Post
							</button>
							<button
								type="button"
								onClick={handleLogout}
								className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							>
								<LogOut className="h-3.5 w-3.5" />
								Logout
							</button>
						</div>
					</div>

					<div className="space-y-2">
						{blogs.length === 0 ? (
							<div className="text-center py-12 text-gray-500 dark:text-gray-400">
								<p className="mb-4">No blog posts yet</p>
								<button
									type="button"
									onClick={() => setIsEditing(true)}
									className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
								>
									<Plus className="h-3.5 w-3.5" />
									Create your first post
								</button>
							</div>
						) : (
							blogs.map((blog: Blog) => (
								<div
									key={blog.id}
									className="border border-gray-200 dark:border-gray-800 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
								>
									<div className="flex justify-between items-start">
										<div
											className="flex-1 cursor-pointer"
											onClick={() => {
												setSelectedBlog(blog);
												setIsEditing(true);
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													setSelectedBlog(blog);
													setIsEditing(true);
												}
											}}
										>
											<h3 className="font-medium text-gray-900 dark:text-gray-100">
												{blog.title}
											</h3>
											<div className="flex items-center gap-2 mt-1">
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{new Date(blog.date).toLocaleDateString()}
												</span>
												<span
													className={`text-xs px-1.5 py-0.5 rounded-full ${
														blog.published
															? "bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-400"
															: "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
													}`}
												>
													{blog.published ? "Published" : "Draft"}
												</span>
											</div>
										</div>
										<button
											type="button"
											className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
											onClick={() => handleDeleteBlog(blog.id)}
										>
											<Trash2 className="h-4 w-4" />
											<span className="sr-only">Delete</span>
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</>
			) : (
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => {
								setIsEditing(false);
								setSelectedBlog(null);
							}}
							className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
						>
							<ChevronLeft className="h-5 w-5" />
							<span className="sr-only">Back</span>
						</button>
						<h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">
							{selectedBlog ? "Edit Post" : "New Post"}
						</h1>
					</div>

					<div className="space-y-4">
						<div>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Post title"
								className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors"
							/>
						</div>

						<div className="flex items-center space-x-2">
							<input
								id="published"
								type="checkbox"
								checked={isPublished}
								onChange={(e) => setIsPublished(e.target.checked)}
								className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-900"
							/>
							<label
								htmlFor="published"
								className="text-sm text-gray-700 dark:text-gray-300"
							>
								Published
							</label>
						</div>

						<div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
							<MarkdownEditor value={content} onChange={setContent} />
						</div>

						<div className="flex justify-end space-x-2 pt-2">
							<button
								type="button"
								onClick={() => {
									setIsEditing(false);
									setSelectedBlog(null);
								}}
								className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSaveBlog}
								className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</PageLayout>
	);
}
