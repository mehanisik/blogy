"use client";

import { Calendar, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { PDFViewer } from "@/components/pdf-viewer";
import type { Tables } from "@/schemas/supabase";

export function PublicationsContent({
	publications,
}: {
	publications: Tables<"publications">[];
}) {
	const [selectedPublication, setSelectedPublication] =
		useState<Tables<"publications"> | null>(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const handlePreview = (publication: Tables<"publications">) => {
		setSelectedPublication(publication);
		setIsPreviewOpen(true);
	};

	const handleClosePreview = () => {
		setIsPreviewOpen(false);
		setSelectedPublication(null);
	};

	return (
		<>
			<section aria-labelledby="publications-heading">
				<h2 id="publications-heading" className="sr-only">
					Publication Listings
				</h2>
				<div className="grid gap-6 sm:gap-8">
					{publications.map((publication, index) => (
						<article
							key={publication.id}
							className="group border border-border rounded-lg p-4 sm:p-6 hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
							style={{
								animationDelay: `${index * 100}ms`,
								animationFillMode: "both",
							}}
						>
							<div className="space-y-3 sm:space-y-4">
								<div className="space-y-2 sm:space-y-3">
									<h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground group-hover:text-foreground/80 transition-colors duration-200">
										{publication.title}
									</h3>
									<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
										{publication.abstract}
									</p>
								</div>

								<div className="space-y-2">
									{publication.authors && (
										<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
											<span className="font-medium">Authors:</span>
											<span>{publication.authors}</span>
										</div>
									)}
									{publication.journal && publication.journal.length > 0 && (
										<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
											<span className="font-medium">Published in:</span>
											<span>{publication.journal.join(", ")}</span>
										</div>
									)}
								</div>

								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
									<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Calendar
												className="w-3 h-3 sm:w-4 sm:h-4"
												aria-hidden="true"
											/>
											<time dateTime={publication.date}>
												{new Date(publication.date).toLocaleDateString(
													"en-US",
													{
														year: "numeric",
														month: "long",
													},
												)}
											</time>
										</div>
										<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs">
											Published
										</span>
									</div>

									<nav aria-label={`Actions for ${publication.title}`}>
										<div className="flex flex-wrap items-center gap-2 sm:gap-3">
											<button
												type="button"
												onClick={() => handlePreview(publication)}
												className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
												aria-label={`Preview details and PDF for ${publication.title}`}
											>
												<Eye
													className="w-3 h-3 sm:w-4 sm:h-4"
													aria-hidden="true"
												/>
												Preview
											</button>
											{publication.pdf && (
												<a
													href={publication.pdf}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
													aria-label={`Download PDF of ${publication.title} (opens in new tab)`}
												>
													<FileText
														className="w-3 h-3 sm:w-4 sm:h-4"
														aria-hidden="true"
													/>
													PDF
												</a>
											)}
										</div>
									</nav>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>

			<div className="sr-only" aria-live="polite">
				Found {publications.length}{" "}
				{publications.length === 1 ? "publication" : "publications"}
			</div>

			<PDFViewer
				isOpen={isPreviewOpen}
				onClose={handleClosePreview}
				publication={selectedPublication}
			/>
		</>
	);
}
