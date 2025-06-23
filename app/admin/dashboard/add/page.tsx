import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPost } from "../../actions";

export const dynamic = "force-dynamic";

export default function AddNewPostPage() {
	return (
		<PageLayout>
			<div className="py-8">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
						Add New Post
					</h1>

					<form action={createPost} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								name="title"
								type="text"
								required
								placeholder="Enter post title"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="slug">Slug *</Label>
							<Input
								id="slug"
								name="slug"
								type="text"
								required
								placeholder="post-url-slug"
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
								placeholder="Write your post content here..."
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="date">Publication Date</Label>
							<Input
								id="date"
								name="date"
								type="datetime-local"
								defaultValue={new Date().toISOString().slice(0, 16)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="read_time">Read Time (minutes)</Label>
							<Input
								id="read_time"
								name="read_time"
								type="number"
								min="1"
								placeholder="5"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="cover_image">Cover Image URL</Label>
							<Input
								id="cover_image"
								name="cover_image"
								type="url"
								placeholder="https://example.com/image.jpg"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="tags">Tags (comma-separated)</Label>
							<Input
								id="tags"
								name="tags"
								type="text"
								placeholder="react, typescript, nextjs"
							/>
						</div>

						<div className="flex items-center space-x-2">
							<input
								id="published"
								name="published"
								type="checkbox"
								value="true"
								className="rounded border-gray-300"
							/>
							<Label htmlFor="published">Publish immediately</Label>
						</div>

						<div className="flex gap-4">
							<Button type="submit" className="flex-1">
								Create Post
							</Button>
							<Link href="/admin/dashboard" className="flex-1">
								<Button type="button" variant="outline" className="w-full">
									Cancel
								</Button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</PageLayout>
	);
}
