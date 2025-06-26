import { ArrowRight, Calendar } from "lucide-react";
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
}

export function EntryTable({ entries }: EntryTableProps) {
	if (!entries || entries.length === 0) {
		return (
			<section aria-labelledby="entries-heading" className="py-8">
				<div className="text-center text-muted-foreground text-base sm:text-lg">
					No entries found.
				</div>
			</section>
		);
	}

	return (
		<section aria-labelledby="entries-heading">
			<div className="space-y-6 sm:space-y-8">
				<div className="space-y-0">
					{entries.map((entry) => (
						<article
							key={entry.id}
							className="relative border-b border-border bg-background py-4 sm:py-6 px-4 transition-all duration-300 hover:bg-foreground/10 focus-within:bg-foreground/10 hover:shadow-sm focus-within:shadow-sm rounded-lg cursor-pointer outline-none"
						>
							<Link
								href={`/posts/${entry.slug}`}
								className="group block space-y-3 sm:space-y-4 focus:outline-none group-hover:bg-foreground/10 group-focus:bg-foreground/10 group-hover:shadow-sm group-focus:shadow-sm rounded-lg"
								aria-label={`Read full article: ${entry.title}`}
							>
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Calendar
											className="w-3 h-3 sm:w-4 sm:h-4"
											aria-hidden="true"
										/>
										<time dateTime={entry.date} suppressHydrationWarning>
											{formatDate(new Date(entry.date))}
										</time>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
									{entry.cover_image && (
										<div className="flex-shrink-0 order-1 sm:order-none">
											<Image
												src={entry.cover_image}
												alt={
													entry.cover_image
														? `Cover image for ${entry.title}`
														: `No cover image`
												}
												className="w-full sm:w-16 sm:h-16 object-cover rounded-md max-w-[200px] sm:max-w-none"
												loading="lazy"
												width={64}
												height={64}
											/>
										</div>
									)}

									<div className="flex-1 min-w-0 order-2 sm:order-none">
										<h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary group-focus:text-primary transition-colors line-clamp-2 mb-2 sm:mb-3">
											{entry.title}
										</h2>
										{entry.description && (
											<p className="text-sm text-muted-foreground line-clamp-2 mb-2">
												{entry.description}
											</p>
										)}
									</div>
									<div className="flex items-center justify-start sm:justify-end pt-2 sm:pt-0 order-3 sm:order-none">
										<span className="inline-flex border rounded px-3 sm:px-4 py-1 items-center gap-2 text-xs sm:text-sm text-primary font-medium group-hover:underline group-focus:underline">
											<ArrowRight
												className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 group-focus:translate-x-1"
												aria-hidden="true"
											/>
										</span>
									</div>
								</div>
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
