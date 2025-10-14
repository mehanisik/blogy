interface PublicationLike {
	journal?: string[] | null;
	institution?: string | null;
	keywords?: string[] | null;
}

export function getPublicationVenue(
	publication: PublicationLike,
): string | null {
	if (
		publication.journal &&
		Array.isArray(publication.journal) &&
		publication.journal.length > 0
	) {
		return publication.journal.join(", ");
	}
	if (publication.institution) {
		return publication.institution;
	}
	return null;
}

export function getThesisLabel(publication: PublicationLike): string | null {
	const haystack = [
		...(publication.journal ?? []),
		publication.institution ?? "",
		...(publication.keywords ?? []),
	]
		.join(" ")
		.toLowerCase();
	if (haystack.includes("msc") || haystack.includes("master"))
		return "MSc Thesis";
	if (haystack.includes("bsc") || haystack.includes("bachelor"))
		return "BSc Thesis";
	if (haystack.includes("thesis")) return "Thesis";
	return null;
}

export function isLikelyMarkdown(text?: string | null): boolean {
	if (!text) return false;
	const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(text);
	const hasMarkdownSyntax = /(\n|^)#{1,6}\s|```|\*\s|-\s|\[.+\]\(.+\)/.test(
		text,
	);
	return hasMarkdownSyntax && !hasHtmlTags;
}

export type KeywordCategory =
	| "web"
	| "database"
	| "ai"
	| "server"
	| "cloud"
	| "other";

export function classifyKeyword(keyword: string): KeywordCategory {
	const k = keyword.toLowerCase();
	if (/(react|next|javascript|typescript|node|deno)/.test(k)) return "web";
	if (/(sql|postgres|database|supabase)/.test(k)) return "database";
	if (/(ai|ml|machine|learning|nlp)/.test(k)) return "ai";
	if (/(server|docker|kubernetes|k8s)/.test(k)) return "server";
	if (/(cloud|aws|gcp|azure)/.test(k)) return "cloud";
	return "other";
}
