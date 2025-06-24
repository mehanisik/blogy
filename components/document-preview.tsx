"use client";

import { Download, ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";

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
	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";

			setTimeout(() => {
				closeButtonRef.current?.focus();
			}, 100);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);
	
	useEffect(() => {
		if (!isOpen || !modalRef.current) return;

		const focusableElements = modalRef.current.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[
			focusableElements.length - 1
		] as HTMLElement;

		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key === "Tab") {
				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			}
		};

		modalRef.current.addEventListener("keydown", handleTabKey);
		return () => {
			modalRef.current?.removeEventListener("keydown", handleTabKey);
		};
	}, [isOpen]);

	if (!isOpen || !publication) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<div
				className="absolute inset-0 bg-background/80 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
			/>

			<div
				ref={modalRef}
				className="relative w-full max-w-3xl max-h-[90vh] bg-background rounded-lg shadow-2xl overflow-hidden animate-slide-up border border-border"
				role="document"
			>
				<div className="flex items-center justify-between p-6 border-b border-border">
					<h2
						id="modal-title"
						className="text-xl font-semibold text-foreground"
					>
						{publication.title}
					</h2>
					<button
						ref={closeButtonRef}
						type="button"
						onClick={onClose}
						className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						aria-label="Close modal"
					>
						<X className="w-5 h-5" aria-hidden="true" />
					</button>
				</div>

				<div
					id="modal-description"
					className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
				>
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium text-foreground mb-3">
								Abstract
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{publication.abstract}
							</p>
						</div>

						<div className="space-y-4">
							{publication.authors && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-foreground-secondary min-w-[60px]">
										Authors:
									</span>
									<span className="text-sm text-muted-foreground">
										{publication.authors}
									</span>
								</div>
							)}

							{publication.journal && publication.journal.length > 0 && (
								<div className="flex items-start gap-3">
									<span className="text-sm font-medium text-foreground-secondary min-w-[60px]">
										Journal:
									</span>
									<span className="text-sm text-muted-foreground">
										{publication.journal.join(", ")}
									</span>
								</div>
							)}

							<div className="flex items-center gap-3">
								<span className="text-sm font-medium text-foreground-secondary min-w-[60px]">
									Date:
								</span>
								<span className="text-sm text-muted-foreground">
									{new Date(publication.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</div>

							{publication.doi && (
								<div className="flex items-center gap-3">
									<span className="text-sm font-medium text-foreground-secondary min-w-[60px]">
										DOI:
									</span>
									<span className="text-sm text-muted-foreground font-mono">
										{publication.doi}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
					<div className="flex items-center gap-2">
						<span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
							Published
						</span>
					</div>

					<div className="flex items-center gap-3">
						{publication.doi && (
							<a
								href={`https://doi.org/${publication.doi}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								aria-label={`View paper on DOI: ${publication.doi}`}
							>
								<ExternalLink className="w-4 h-4" aria-hidden="true" />
								View Paper
							</a>
						)}
						{publication.pdf && (
							<a
								href={publication.pdf}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-4 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								aria-label="Download PDF version of the paper"
							>
								<Download className="w-4 h-4" aria-hidden="true" />
								Download PDF
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
