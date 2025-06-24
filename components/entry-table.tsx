import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/date";

interface Entry {
	id: string;
	title: string;
	description: string;
	date: string;
	slug: string;
	cover_image?: string | null;
}

interface EntryTableProps {
	entries: Entry[];
	title: string;
	description?: string;
}

export function EntryTable({ entries, title, description }: EntryTableProps) {
	return (
		<section aria-labelledby="entries-heading">
			<div className="space-y-6 sm:space-y-8">
				<div>
					<h1
						id="entries-heading"
						className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-foreground"
					>
						{title}
					</h1>
					{description && (
						<p className="text-muted-foreground mt-2 sm:mt-3 text-base sm:text-lg">{description}</p>
					)}
				</div>

				<div className="space-y-0">
					{entries.map((entry) => (
						<article
							key={entry.id}
							className="group relative border-b border-border bg-background py-4 sm:py-6 px-4 hover:bg-foreground/10 cursor-pointer  transition-colors duration-300"
						>
							<Link
								href={`/posts/${entry.slug}`}
								className="space-y-3 sm:space-y-4"
								aria-label={`Read full article: ${entry.title}`}
							>
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Calendar className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
										<time dateTime={entry.date}>{formatDate(entry.date)}</time>
									</div>
									<div className="flex items-center gap-2">
										<Clock className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
										<span>
											{Math.ceil(entry.description.length / 200)} min read
										</span>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
									{entry.cover_image && (
										<div className="flex-shrink-0 order-1 sm:order-none">
											<Image
												src={entry.cover_image}
												alt={`Cover image for ${entry.title}`}
												className="w-full sm:w-16 sm:h-16 object-cover rounded-md max-w-[200px] sm:max-w-none"
												loading="lazy"
											/>
										</div>
									)}

									<div className="flex-1 min-w-0 order-2 sm:order-none">
										<h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 sm:mb-3">
											{entry.title}
										</h2>

										<p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
											{entry.description}
										</p>
									</div>
									<div className="flex items-center justify-start sm:justify-end pt-2 sm:pt-0 order-3 sm:order-none">
										<span className="inline-flex border rounded px-3 sm:px-4 py-1 items-center gap-2 text-xs sm:text-sm text-primary font-medium group-hover:underline">
											<ArrowRight
												className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
												aria-hidden="true"
											/>
										</span>
									</div>
								</div>
							</Link>
						</article>
					))}
				</div>

				<div className="sr-only" aria-live="polite">
					Found {entries.length} {entries.length === 1 ? "entry" : "entries"} in{" "}
					{title.toLowerCase()}
				</div>
			</div>
		</section>
	);
}
