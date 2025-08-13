import { Calendar, Clock, Tag as TagIcon } from "lucide-react";
import { Markdown } from "@/components/blog/markdown";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/types/supabase";
import { formatMonthYearShort, timeAgo } from "@/utils/helpers/date";

export function PostContent({ post }: { post: Tables<"blogs"> }) {
	return (
		<div className="w-full py-5 px-5 md:px-0">
			<h1 className="text-3xl font-bold mb-2 leading-tight">{post.title}</h1>
			{post.subtitle && (
				<p className="text-base text-muted-foreground mb-2">{post.subtitle}</p>
			)}

			<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
				{post.date && (
					<span className="inline-flex items-center gap-1">
						<Calendar className="w-3 h-3" />
						{formatMonthYearShort(post.date) ?? post.date}
					</span>
				)}
				{post.read_time && (
					<span className="inline-flex items-center gap-1">
						<Clock className="w-3 h-3" />
						{post.read_time} min read
					</span>
				)}
				{post.updated_at && (
					<span className="inline-flex items-center gap-1">
						Updated {timeAgo(post.updated_at)}
					</span>
				)}
			</div>

			{post.tags?.length ? (
				<div className="flex flex-wrap gap-1.5 mb-6">
					{post.tags.map((tag: string) => (
						<Badge key={tag} variant="outline" className="font-normal">
							<TagIcon className="w-3 h-3" />
							{tag}
						</Badge>
					))}
				</div>
			) : null}
			{post.content && (
				<div className="prose prose-neutral dark:prose-invert max-w-none">
					<Markdown content={post.content} />
				</div>
			)}
		</div>
	);
}
