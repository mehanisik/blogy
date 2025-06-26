export type Database = {
	public: {
		Tables: {
			blogs: {
				Row: {
					content: string;
					cover_image: string | null;
					date: string;
					id: number;
					published: boolean;
					read_time: number | null;
					slug: string | null;
					subtitle: string | null;
					tags: string[] | null;
					title: string;
					updated_at: string | null;
					user_id: string | null;
				};
				Insert: {
					content: string;
					cover_image?: string | null;
					date: string;
					id?: number;
					published?: boolean;
					read_time?: number | null;
					slug?: string | null;
					subtitle?: string | null;
					tags?: string[] | null;
					title: string;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					content?: string;
					cover_image?: string | null;
					date?: string;
					id?: number;
					published?: boolean;
					read_time?: number | null;
					slug?: string | null;
					subtitle?: string | null;
					tags?: string[] | null;
					title?: string;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [];
			};
			projects: {
				Row: {
					cover_image: string | null;
					demo: string | null;
					description: string;
					end_date: string | null;
					featured: boolean | null;
					github: string | null;
					id: number;
					slug: string | null;
					start_date: string | null;
					tags: string[] | null;
					technologies: string[];
					title: string;
				};
				Insert: {
					cover_image?: string | null;
					demo?: string | null;
					description: string;
					end_date?: string | null;
					featured?: boolean | null;
					github?: string | null;
					id?: never;
					slug?: string | null;
					start_date?: string | null;
					tags?: string[] | null;
					technologies: string[];
					title: string;
				};
				Update: {
					cover_image?: string | null;
					demo?: string | null;
					description?: string;
					end_date?: string | null;
					featured?: boolean | null;
					github?: string | null;
					id?: never;
					slug?: string | null;
					start_date?: string | null;
					tags?: string[] | null;
					technologies?: string[];
					title?: string;
				};
				Relationships: [];
			};
			publications: {
				Row: {
					abstract: string;
					authors: string;
					citation: string | null;
					cover_image: string | null;
					date: string;
					doi: string | null;
					id: number;
					institution: string | null;
					journal: string[] | null;
					keywords: string[] | null;
					page_count: number | null;
					pdf: string | null;
					slug: string | null;
					title: string;
				};
				Insert: {
					abstract: string;
					authors: string;
					citation?: string | null;
					cover_image?: string | null;
					date: string;
					doi?: string | null;
					id?: never;
					institution?: string | null;
					journal?: string[] | null;
					keywords?: string[] | null;
					page_count?: number | null;
					pdf?: string | null;
					slug?: string | null;
					title: string;
				};
				Update: {
					abstract?: string;
					authors?: string;
					citation?: string | null;
					cover_image?: string | null;
					date?: string;
					doi?: string | null;
					id?: never;
					institution?: string | null;
					journal?: string[] | null;
					keywords?: string[] | null;
					page_count?: number | null;
					pdf?: string | null;
					slug?: string | null;
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

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;
