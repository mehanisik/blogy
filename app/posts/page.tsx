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
	description: string;
	date: string;
	slug: string;
	cover_image?: string | null;
}

function mapBlogToEntry(blog: Blog): Entry {
	return {
		id: blog.id.toString(),
		title: blog.title,
		description: blog.subtitle || blog.content,
		date: blog.date,
		slug: blog.slug || "",
		cover_image: blog.cover_image,
	};
}

export const revalidate = 3600;

export default async function PostsPage() {
	const blogs = await getPosts();
	const entries: Entry[] = blogs.map(mapBlogToEntry);

	return (
		<Suspense fallback={<PostsLoading />}>
			<PageLayout>
				<main className="py-8">
					{entries.length === 0 ? (
						<div className="py-24 text-center">
							<div className="space-y-4">
								<div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
									<svg
										className="w-8 h-8 text-muted-foreground"
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
								<h2 className="text-xl font-semibold text-foreground">
									No posts available yet
								</h2>
								<p className="text-muted-foreground">
									Add some posts to your Supabase database to see them here.
								</p>
							</div>
						</div>
					) : (
						<EntryTable
							entries={entries}
							title="Blog Posts"
							description="Thoughts, tutorials, and insights on software development, React, TypeScript, and web technologies."
						/>
					)}
				</main>
			</PageLayout>
		</Suspense>
	);
}
