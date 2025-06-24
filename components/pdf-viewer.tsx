"use client";

import {
	BookOpen,
	Calendar,
	Download,
	ExternalLink,
	FileText,
	Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Tables } from "@/schemas/supabase";

type Publication = Tables<"publications">;

interface PDFViewerProps {
	isOpen: boolean;
	onClose: () => void;
	publication: Publication | null;
}

export function PDFViewer({ isOpen, onClose, publication }: PDFViewerProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [pdfError, setPdfError] = useState(false);

	useEffect(() => {
		if (isOpen && publication?.pdf) {
			setPdfError(false);
		}
	}, [isOpen, publication]);

	if (!publication) return null;

	const handlePDFView = () => {
		if (publication.pdf) {
			setIsLoading(true);
			window.open(publication.pdf, "_blank");
			setIsLoading(false);
		}
	};

	const handlePDFError = () => {
		setPdfError(true);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose} >
			<DialogContent className="max-w-full sm:max-w-6xl w-full p-2 sm:p-6 max-h-[98vh] sm:max-h-[95vh] overflow-hidden">
				<DialogHeader>
					<DialogTitle className="text-base sm:text-xl font-semibold text-foreground">
						{publication.title}
					</DialogTitle>
					<DialogDescription className="text-xs sm:text-sm text-muted-foreground">
						Publication details and PDF viewer
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col lg:flex-row gap-4 sm:gap-6 overflow-hidden h-full">
					<div className="flex-1 space-y-4 sm:space-y-6 overflow-y-auto max-h-[40vh] sm:max-h-[60vh] lg:max-h-[80vh] lg:w-1/3 px-1 sm:px-0">
						<div>
							<h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
								<BookOpen className="w-5 h-5" aria-hidden="true" />
								Abstract
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{publication.abstract}
							</p>
						</div>

						<div className="space-y-4">
							{publication.authors && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-foreground min-w-[80px]">
										Authors:
									</span>
									<span className="text-sm text-muted-foreground">
										{publication.authors}
									</span>
								</div>
							)}

							{publication.journal && publication.journal.length > 0 && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-foreground min-w-[80px]">
										Journal:
									</span>
									<span className="text-sm text-muted-foreground">
										{publication.journal.join(", ")}
									</span>
								</div>
							)}

							<div className="flex items-center gap-3">
								<span className="text-sm font-medium text-foreground min-w-[80px]">
									Date:
								</span>
								<div className="flex items-center gap-2">
									<Calendar
										className="w-4 h-4 text-muted-foreground"
										aria-hidden="true"
									/>
									<span className="text-sm text-muted-foreground">
										{new Date(publication.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
							</div>

							{publication.doi && (
								<div className="flex items-center gap-3">
									<span className="text-sm font-medium text-foreground min-w-[80px]">
										DOI:
									</span>
									<span className="text-sm text-muted-foreground font-mono">
										{publication.doi}
									</span>
								</div>
							)}

							{publication.institution && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-foreground min-w-[80px]">
										Institution:
									</span>
									<span className="text-sm text-muted-foreground">
										{publication.institution}
									</span>
								</div>
							)}

							{publication.keywords && publication.keywords.length > 0 && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-foreground min-w-[80px]">
										Keywords:
									</span>
									<div className="flex flex-wrap gap-2">
										{publication.keywords.map((keyword) => (
											<span
												key={crypto.randomUUID()}
												className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
											>
												{keyword}
											</span>
										))}
									</div>
								</div>
							)}
						</div>

						<div className="flex flex-col gap-3 pt-4 border-t border-border">
							{publication.pdf && (
								<>
									<Button
										onClick={handlePDFView}
										disabled={isLoading}
										className="flex items-center gap-2"
										variant="default"
									>
										{isLoading ? (
											<Loader2
												className="w-4 h-4 animate-spin"
												aria-hidden="true"
											/>
										) : (
											<FileText className="w-4 h-4" aria-hidden="true" />
										)}
										{isLoading ? "Opening..." : "Open PDF in New Tab"}
									</Button>

									<Button
										asChild
										variant="outline"
										className="flex items-center gap-2"
									>
										<a
											href={publication.pdf}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Download PDF"
										>
											<Download className="w-4 h-4" aria-hidden="true" />
											Download PDF
										</a>
									</Button>
								</>
							)}

							{publication.doi && (
								<Button
									asChild
									variant="outline"
									className="flex items-center gap-2"
								>
									<a
										href={`https://doi.org/${publication.doi}`}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`View paper on DOI: ${publication.doi}`}
									>
										<ExternalLink className="w-4 h-4" aria-hidden="true" />
										View Online
									</a>
								</Button>
							)}
						</div>
					</div>

					<div className="flex-1 lg:w-2/3 mt-4 lg:mt-0">
						<div className="bg-muted/50 rounded-lg border border-border overflow-hidden h-[40vh] sm:h-[70vh]">
							{!pdfError ? (
								<iframe
									src={`${publication.pdf}#toolbar=1&navpanes=1&scrollbar=1`}
									className="w-full h-full"
									title={`PDF viewer for ${publication.title}`}
									onError={handlePDFError}
								/>
							) : (
								<div className="flex items-center justify-center h-full">
									<div className="text-center space-y-4">
										<FileText
											className="w-16 h-16 text-muted-foreground mx-auto"
											aria-hidden="true"
										/>
										<div>
											<h3 className="text-lg font-medium text-foreground mb-2">
												PDF Preview Unavailable
											</h3>
											<p className="text-sm text-muted-foreground mb-4">
												The PDF cannot be displayed in the browser. Please use
												the buttons below to view or download the PDF.
											</p>
										</div>
										<div className="flex flex-col sm:flex-row gap-3 justify-center">
											<Button
												onClick={handlePDFView}
												disabled={isLoading}
												className="flex items-center gap-2"
												variant="default"
											>
												{isLoading ? (
													<Loader2
														className="w-4 h-4 animate-spin"
														aria-hidden="true"
													/>
												) : (
													<FileText className="w-4 h-4" aria-hidden="true" />
												)}
												{isLoading ? "Opening..." : "Open PDF"}
											</Button>

											<Button
												asChild
												variant="outline"
												className="flex items-center gap-2"
											>
												<Link
													href={publication.pdf || ""}
													rel="noopener noreferrer"
													aria-label="Download PDF"
												>
													<Download className="w-4 h-4" aria-hidden="true" />
													Download
												</Link>
											</Button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
