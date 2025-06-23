import { Suspense } from "react";
import { EntryTable } from "@/components/entry-table";
import { PageLayout } from "@/components/page-layout";
import type { Tables } from "@/schemas/supabase";
import { getPosts } from "@/utils/data";
import PostsLoading from "./loading";

type Blog = Tables<"blogs">;

interface Entry {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	read_time: string;
	slug: string;
	published: boolean;
	tags: string[];
}

function mapBlogToEntry(blog: Blog): Entry {
	return {
		id: blog.id.toString(),
		title: blog.title,
		excerpt: blog.subtitle || blog.content,
		date: blog.date,
		read_time: blog.read_time ? `${blog.read_time} min read` : "5 min read",
		slug: blog.slug || "",
		published: blog.published,
		tags: blog.tags || [],
	};
}

export const revalidate = 3600;

export default async function PostsPage() {
	const blogs = await getPosts();
	const entries: Entry[] = blogs.map(mapBlogToEntry);

	return (
		<Suspense fallback={<PostsLoading />}>
			<PageLayout>
				<div className="py-16">
					<div className="space-y-12">
						{entries.length === 0 ? (
							<div className="py-24 text-center">
								<div className="space-y-4">
									<div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
										<svg
											className="w-8 h-8 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
											/>
										</svg>
									</div>
									<p className="text-gray-500 dark:text-gray-500">
										No posts available yet.
									</p>
									<p className="text-sm text-gray-400 dark:text-gray-600">
										Add some posts to your Supabase database to see them here.
									</p>
								</div>
							</div>
						) : (
							<EntryTable entries={entries} />
						)}
					</div>
				</div>
			</PageLayout>
		</Suspense>
	);
}
