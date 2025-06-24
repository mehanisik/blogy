import { notFound } from "next/navigation";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPostById } from "@/utils/admin-data";
import { updatePost } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function UpdatePostPage({
	params,
}: {
	params: { id: string };
}) {
	const id = Number(params.id);
	if (!id) return notFound();
	const post = await getPostById(id);
	if (!post) return notFound();

	return (
		<PageLayout>
			<div className="py-8">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-3xl font-bold text-foreground mb-8">Edit Post</h1>
					<form action={updatePost} className="space-y-6">
						<input type="hidden" name="id" value={post.id} />
						<div className="space-y-2">
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								name="title"
								type="text"
								required
								defaultValue={post.title || ""}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="slug">Slug *</Label>
							<Input
								id="slug"
								name="slug"
								type="text"
								required
								defaultValue={post.slug || ""}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="content">Content *</Label>
							<textarea
								id="content"
								name="content"
								required
								rows={10}
								className="flex w-full border bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
								defaultValue={post.content || ""}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="date">Publication Date</Label>
							<Input
								id="date"
								name="date"
								type="datetime-local"
								defaultValue={
									post.date
										? new Date(post.date).toISOString().slice(0, 16)
										: ""
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="read_time">Read Time (minutes)</Label>
							<Input
								id="read_time"
								name="read_time"
								type="number"
								min="1"
								defaultValue={post.read_time || ""}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="cover_image">Cover Image URL</Label>
							<Input
								id="cover_image"
								name="cover_image"
								type="url"
								defaultValue={post.cover_image || ""}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="tags">Tags (comma-separated)</Label>
							<Input
								id="tags"
								name="tags"
								type="text"
								defaultValue={post.tags ? post.tags.join(", ") : ""}
							/>
						</div>
						<div className="flex items-center space-x-2">
							<input
								id="published"
								name="published"
								type="checkbox"
								value="true"
								className="rounded border-border"
								defaultChecked={post.published}
							/>
							<Label htmlFor="published">Publish</Label>
						</div>
						<div className="flex gap-4">
							<Button type="submit" className="flex-1">
								Update Post
							</Button>
						</div>
					</form>
				</div>
			</div>
		</PageLayout>
	);
}
