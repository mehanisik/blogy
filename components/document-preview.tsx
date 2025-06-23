"use client";

import { Download, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";

interface DocumentPreviewProps {
	isOpen: boolean;
	onClose: () => void;
	publication: {
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
	} | null;
}

export function DocumentPreview({
	isOpen,
	onClose,
	publication,
}: DocumentPreviewProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen || !publication) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						onClose();
					}
				}}
				role="button"
				tabIndex={0}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden animate-slide-up">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
						{publication.title}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
						aria-label="Close modal"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
					<div className="space-y-6">
						{/* Abstract */}
						<div>
							<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
								Abstract
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								{publication.abstract}
							</p>
						</div>

						{/* Publication Details */}
						<div className="space-y-4">
							{publication.authors && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
										Authors:
									</span>
									<span className="text-sm text-gray-600 dark:text-gray-400">
										{publication.authors}
									</span>
								</div>
							)}

							{publication.journal && publication.journal.length > 0 && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
										Journal:
									</span>
									<span className="text-sm text-gray-600 dark:text-gray-400">
										{publication.journal.join(", ")}
									</span>
								</div>
							)}

							<div className="flex items-center gap-3">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
									Date:
								</span>
								<span className="text-sm text-gray-600 dark:text-gray-400">
									{new Date(publication.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</div>

							{publication.doi && (
								<div className="flex items-center gap-3">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
										DOI:
									</span>
									<span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
										{publication.doi}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
					<div className="flex items-center gap-2">
						<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
							Published
						</span>
					</div>

					<div className="flex items-center gap-3">
						{publication.doi && (
							<a
								href={`https://doi.org/${publication.doi}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<ExternalLink className="w-4 h-4" />
								View Paper
							</a>
						)}
						{publication.pdf && (
							<a
								href={publication.pdf}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
							>
								<Download className="w-4 h-4" />
								Download PDF
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
