export interface Blog {
	id: number;
	title: string;
	content: string;
	author: string;
	date: string;
	tags?: string[];
	published: boolean;
}
