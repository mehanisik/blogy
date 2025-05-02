export type Database = {
	public: {
		Tables: {
			blogs: {
				Row: {
					content: string;
					date: string;
					id: number;
					published: boolean;
					tags: string[] | null;
					title: string;
					user_id: string | null;
				};
				Insert: {
					content: string;
					date: string;
					id?: number;
					published?: boolean;
					tags?: string[] | null;
					title: string;
					user_id?: string | null;
				};
				Update: {
					content?: string;
					date?: string;
					id?: number;
					published?: boolean;
					tags?: string[] | null;
					title?: string;
					user_id?: string | null;
				};
				Relationships: [];
			};
			projects: {
				Row: {
					demo: string | null;
					description: string;
					github: string | null;
					id: number;
					technologies: string[];
					title: string;
				};
				Insert: {
					demo?: string | null;
					description: string;
					github?: string | null;
					id?: never;
					technologies: string[];
					title: string;
				};
				Update: {
					demo?: string | null;
					description?: string;
					github?: string | null;
					id?: never;
					technologies?: string[];
					title?: string;
				};
				Relationships: [];
			};
			publications: {
				Row: {
					abstract: string;
					authors: string;
					date: string;
					doi: string | null;
					id: number;
					journal: string;
					pdf: string | null;
					title: string;
				};
				Insert: {
					abstract: string;
					authors: string;
					date: string;
					doi?: string | null;
					id?: never;
					journal: string;
					pdf?: string | null;
					title: string;
				};
				Update: {
					abstract?: string;
					authors?: string;
					date?: string;
					doi?: string | null;
					id?: never;
					journal?: string;
					pdf?: string | null;
					title?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

export type Blog = Database["public"]["Tables"]["blogs"]["Row"];
export type BlogInsert = Database["public"]["Tables"]["blogs"]["Insert"];
export type BlogUpdate = Database["public"]["Tables"]["blogs"]["Update"];

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export type Publication = Database["public"]["Tables"]["publications"]["Row"];
