export interface Publication {
	id: number;
	title: string;
	authors: string;
	date: string;
	journal: string;
	abstract: string;
	doi?: string;
	pdf?: string;
}
