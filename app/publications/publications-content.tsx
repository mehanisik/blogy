"use client";

import { BookOpen, Calendar, ExternalLink, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { DocumentPreview } from "@/components/document-preview";

interface Publication {
	id: number;
	title: string;
	abstract: string;
	authors?: string;
	journal?: string[] | null;
	doi?: string | null;
	pdf?: string | null;
	date: string;
	citation?: string | null;
	cover_image?: string | null;
	institution?: string | null;
}

interface PublicationsContentProps {
	publications: Publication[];
}

export function PublicationsContent({
	publications,
}: PublicationsContentProps) {
	const [selectedPublication, setSelectedPublication] =
		useState<Publication | null>(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const handlePreview = (publication: Publication) => {
		setSelectedPublication(publication);
		setIsPreviewOpen(true);
	};

	const handleClosePreview = () => {
		setIsPreviewOpen(false);
		setSelectedPublication(null);
	};

	return (
		<>
			<div className="py-16">
				<div className="space-y-12">
					{publications.length === 0 ? (
						<div className="py-24 text-center animate-fade-in">
							<div className="space-y-4">
								<div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
									<BookOpen className="w-8 h-8 text-gray-400" />
								</div>
								<p className="text-gray-500 dark:text-gray-500">
									No publications available yet.
								</p>
								<p className="text-sm text-gray-400 dark:text-gray-600">
									Add some publications to your Supabase database to see them
									here.
								</p>
							</div>
						</div>
					) : (
						<div className="grid gap-8">
							{publications.map((publication, index) => (
								<article
									key={publication.id}
									className="group border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up"
									style={{
										animationDelay: `${index * 100}ms`,
										animationFillMode: "both",
									}}
								>
									<div className="space-y-4">
										<div className="space-y-3">
											<h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
												{publication.title}
											</h2>
											<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
												{publication.abstract}
											</p>
										</div>

										<div className="space-y-2">
											{publication.authors && (
												<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
													<span className="font-medium">Authors:</span>
													<span>{publication.authors}</span>
												</div>
											)}
											{publication.journal &&
												publication.journal.length > 0 && (
													<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
														<span className="font-medium">Published in:</span>
														<span>{publication.journal.join(", ")}</span>
													</div>
												)}
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
												<div className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													<span>
														{new Date(publication.date).toLocaleDateString(
															"en-US",
															{
																year: "numeric",
																month: "long",
															},
														)}
													</span>
												</div>
												<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs">
													Published
												</span>
											</div>

											<div className="flex items-center gap-3">
												<button
													type="button"
													onClick={() => handlePreview(publication)}
													className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:scale-105"
												>
													<Eye className="w-4 h-4" />
													Preview
												</button>
												{publication.doi && (
													<a
														href={`https://doi.org/${publication.doi}`}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:scale-105"
													>
														<ExternalLink className="w-4 h-4" />
														View
													</a>
												)}
												{publication.pdf && (
													<a
														href={publication.pdf}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:scale-105"
													>
														<FileText className="w-4 h-4" />
														PDF
													</a>
												)}
											</div>
										</div>
									</div>
								</article>
							))}
						</div>
					)}
				</div>
			</div>

			<DocumentPreview
				isOpen={isPreviewOpen}
				onClose={handleClosePreview}
				publication={selectedPublication}
			/>
		</>
	);
}
