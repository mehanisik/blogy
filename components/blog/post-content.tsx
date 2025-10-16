import { Calendar, Clock, Eye, Tag as TagIcon } from "lucide-react";
import Image from "next/image";
import { Markdown } from "@/components/blog/markdown";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Tables } from "@/types/supabase";
import { formatMonthYearShort, timeAgo } from "@/utils/helpers/date";

export function PostContent({ post }: { post: Tables<"blogs"> }) {
	return (
		<article className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
			<header className="mb-8">
				{post.cover_image && (
					<div className="relative mb-8 h-96 w-full">
						<Image
							src={post.cover_image}
							alt={post.title}
							fill
							className="rounded-lg object-cover"
						/>
					</div>
				)}
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
					{post.title}
				</h1>

				<div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
					{post.date && (
						<span className="inline-flex items-center gap-1.5">
							<Calendar className="h-4 w-4" />
							{formatMonthYearShort(post.date) ?? post.date}
						</span>
					)}
					{post.read_time && (
						<span className="inline-flex items-center gap-1.5">
							<Clock className="h-4 w-4" />
							{post.read_time} min read
						</span>
					)}
					{post.view_count && (
						<span className="inline-flex items-center gap-1.5">
							<Eye className="h-4 w-4" />
							{post.view_count} views
						</span>
					)}
					{post.updated_at && (
						<span className="inline-flex items-center gap-1.5">
							Updated {timeAgo(post.updated_at)}
						</span>
					)}
				</div>

				{post.tags?.length ? (
					<div className="mt-4 flex flex-wrap gap-2">
						{post.tags.map((tag: string) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
				) : null}
			</header>

			<Separator className="my-8" />

			{post.content && (
				<div className="prose prose-neutral max-w-none dark:prose-invert">
					<Markdown content={post.content} />
				</div>
			)}
		</article>
	);
}
