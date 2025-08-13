export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	// Allows to automatically instanciate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "12.2.12 (cd3cf9e)";
	};
	public: {
		Tables: {
			app_config: {
				Row: {
					admin_id: string;
				};
				Insert: {
					admin_id: string;
				};
				Update: {
					admin_id?: string;
				};
				Relationships: [];
			};
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
					content: string | null;
					cover_image: string | null;
					demo: string | null;
					description: string;
					end_date: string | null;
					github: string | null;
					id: number;
					image_url: string | null;
					slug: string | null;
					start_date: string | null;
					status: Database["public"]["Enums"]["project_status"] | null;
					tags: string[] | null;
					technologies: string[];
					title: string;
				};
				Insert: {
					content?: string | null;
					cover_image?: string | null;
					demo?: string | null;
					description: string;
					end_date?: string | null;
					github?: string | null;
					id?: never;
					image_url?: string | null;
					slug?: string | null;
					start_date?: string | null;
					status?: Database["public"]["Enums"]["project_status"] | null;
					tags?: string[] | null;
					technologies: string[];
					title: string;
				};
				Update: {
					content?: string | null;
					cover_image?: string | null;
					demo?: string | null;
					description?: string;
					end_date?: string | null;
					github?: string | null;
					id?: never;
					image_url?: string | null;
					slug?: string | null;
					start_date?: string | null;
					status?: Database["public"]["Enums"]["project_status"] | null;
					tags?: string[] | null;
					technologies?: string[];
					title?: string;
				};
				Relationships: [];
			};
			publications: {
				Row: {
					authors: string;
					citation: string | null;
					content: string | null;
					cover_image: string | null;
					date: string;
					description: string;
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
					authors: string;
					citation?: string | null;
					content?: string | null;
					cover_image?: string | null;
					date: string;
					description: string;
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
					authors?: string;
					citation?: string | null;
					content?: string | null;
					cover_image?: string | null;
					date?: string;
					description?: string;
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
			goal_category: "goal" | "aim" | "note";
			project_status: "draft" | "published" | "archived";
			publication_type: "article" | "paper" | "conference" | "book";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	"public"
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {
			goal_category: ["goal", "aim", "note"],
			project_status: ["draft", "published", "archived"],
			publication_type: ["article", "paper", "conference", "book"],
		},
	},
} as const;
