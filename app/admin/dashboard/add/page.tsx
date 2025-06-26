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
			<main className="py-8">
				<div className="max-w-2xl mx-auto">
					<header className="mb-8">
						<h1 className="text-3xl font-bold text-foreground mb-3">
							Add New Post
						</h1>
						<p className="text-muted-foreground">
							Fill out the form to create a new post.
						</p>
					</header>

					<form
						action={createPost}
						className="space-y-6"
						aria-labelledby="form-title"
					>
						<h2 id="form-title" className="sr-only">
							Post Creation Form
						</h2>

						<fieldset className="space-y-2">
							<legend className="sr-only">Post Title</legend>
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								name="title"
								type="text"
								required
								placeholder="Enter post title"
								aria-describedby="title-help"
								aria-required="true"
							/>
							<div id="title-help" className="text-sm text-muted-foreground">
								The main title of your blog post
							</div>
						</fieldset>

						<fieldset className="space-y-2">
							<legend className="sr-only">URL Slug</legend>
							<Label htmlFor="slug">Slug *</Label>
							<Input
								id="slug"
								name="slug"
								type="text"
								required
								placeholder="post-url-slug"
								aria-describedby="slug-help"
								aria-required="true"
							/>
							<div id="slug-help" className="text-sm text-muted-foreground">
								URL-friendly version of the title (e.g., "my-awesome-post")
							</div>
						</fieldset>

						<fieldset className="space-y-2">
							<legend className="sr-only">Post Content</legend>
							<Label htmlFor="content">Content *</Label>
							<textarea
								id="content"
								name="content"
								required
								rows={10}
								className="flex w-full border bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
								placeholder="Write your post content here..."
								aria-describedby="content-help"
								aria-required="true"
							/>
							<div id="content-help" className="text-sm text-muted-foreground">
								The main content of your blog post. Supports Markdown
								formatting.
							</div>
						</fieldset>

						<fieldset className="space-y-2">
							<legend className="sr-only">Publication Date</legend>
							<Label htmlFor="date">Publication Date</Label>
							<Input
								id="date"
								name="date"
								type="datetime-local"
								defaultValue={new Date().toISOString().slice(0, 16)}
								aria-describedby="date-help"
							/>
							<div id="date-help" className="text-sm text-muted-foreground">
								When the post should be published (defaults to now)
							</div>
						</fieldset>

						<fieldset className="space-y-2">
							<legend className="sr-only">Read Time</legend>
							<Label htmlFor="read_time">Read Time (minutes)</Label>
							<Input
								id="read_time"
								name="read_time"
								type="number"
								min="1"
								placeholder="5"
								aria-describedby="read-time-help"
							/>
							<div
								id="read-time-help"
								className="text-sm text-muted-foreground"
							>
								Estimated reading time in minutes
							</div>
						</fieldset>

						<fieldset className="space-y-2">
							<legend className="sr-only">Cover Image</legend>
							<Label htmlFor="cover_image">Cover Image URL</Label>
							<Input
								id="cover_image"
								name="cover_image"
								type="url"
								placeholder="https://example.com/image.jpg"
								aria-describedby="cover-image-help"
							/>
							<div
								id="cover-image-help"
								className="text-sm text-muted-foreground"
							>
								Optional cover image for the post
							</div>
						</fieldset>

						<fieldset className="space-y-2">
							<legend className="sr-only">Tags</legend>
							<Label htmlFor="tags">Tags (comma-separated)</Label>
							<Input
								id="tags"
								name="tags"
								type="text"
								placeholder="react, typescript, nextjs"
								aria-describedby="tags-help"
							/>
							<div id="tags-help" className="text-sm text-muted-foreground">
								Comma-separated list of tags for categorizing the post
							</div>
						</fieldset>

						<fieldset className="space-y-2">
							<legend className="sr-only">Publication Status</legend>
							<div className="flex items-center space-x-2">
								<input
									id="published"
									name="published"
									type="checkbox"
									value="true"
									className="rounded border-border focus:ring-2 focus:ring-primary focus:ring-offset-2"
									aria-describedby="published-help"
								/>
								<Label htmlFor="published">Publish immediately</Label>
							</div>
							<div
								id="published-help"
								className="text-sm text-muted-foreground"
							>
								If unchecked, the post will be saved as a draft
							</div>
						</fieldset>

						<div className="flex gap-4 pt-4">
							<Button
								type="submit"
								className="flex-1"
								aria-label="Create and save the new post"
							>
								Create Post
							</Button>
							<Link href="/admin/dashboard" className="flex-1">
								<Button
									type="button"
									variant="outline"
									className="w-full"
									aria-label="Cancel and return to dashboard"
								>
									Cancel
								</Button>
							</Link>
						</div>
					</form>
				</div>
			</main>
		</PageLayout>
	);
}
