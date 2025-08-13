import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { Markdown } from "@/components/blog/markdown";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/types/supabase";
import { formatMonthYearShort } from "@/utils/helpers/date";
import {
	getPublicationVenue,
	isLikelyMarkdown,
} from "@/utils/helpers/publications";

export function PublicationDetail({
	publication,
}: {
	publication: Tables<"publications">;
}) {
	return (
		<div className="w-full py-5 space-y-6">
			<Link
				href="/publications"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeft className="w-4 h-4" />
				Back
			</Link>

			<section className="space-y-4">
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					{publication.date && (
						<>
							<Calendar className="w-4 h-4" />
							{formatMonthYearShort(publication.date)}
						</>
					)}
				</div>

				<h1 className="text-2xl font-semibold tracking-tight">
					{publication.title}
				</h1>
				{publication.authors && (
					<p className="text-sm text-muted-foreground">{publication.authors}</p>
				)}

				<div className="flex flex-wrap gap-2">
					{getPublicationVenue(publication) && (
						<Badge
							variant="outline"
							className="border-border text-muted-foreground"
						>
							{getPublicationVenue(publication)}
						</Badge>
					)}
					{publication.doi && (
						<Badge
							variant="outline"
							className="font-mono border-border text-muted-foreground"
						>
							DOI: {publication.doi}
						</Badge>
					)}
				</div>

				{publication.description && (
					<p className="text-muted-foreground leading-relaxed">
						{publication.description}
					</p>
				)}

				{publication.content && (
					<div className="prose prose-neutral dark:prose-invert max-w-none">
						{isLikelyMarkdown(publication.content) ? (
							<Markdown content={publication.content} />
						) : (
							<div dangerouslySetInnerHTML={{ __html: publication.content }} />
						)}
					</div>
				)}
				{publication.pdf && (
					<iframe
						className="w-full h-full min-h-[800px] border-0 bg-foreground text-foreground"
						title="Publication PDF"
						src={publication.pdf}
					/>
				)}
			</section>
		</div>
	);
}
