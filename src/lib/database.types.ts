export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      app_config: {
        Row: {
          admin_id: string
        }
        Insert: {
          admin_id: string
        }
        Update: {
          admin_id?: string
        }
        Relationships: []
      }
      hero: {
        Row: {
          avatar_url: string | null
          contact: Json
          created_at: string | null
          id: number
          location: string
          name: string
          role: string
          summary: string
          tagline: string
        }
        Insert: {
          avatar_url?: string | null
          contact: Json
          created_at?: string | null
          id?: number
          location: string
          name: string
          role: string
          summary: string
          tagline: string
        }
        Update: {
          avatar_url?: string | null
          contact?: Json
          created_at?: string | null
          id?: number
          location?: string
          name?: string
          role?: string
          summary?: string
          tagline?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          content: string | null
          cover_image: string | null
          demo: string | null
          description: string
          end_date: string | null
          featured: boolean
          github: string | null
          id: number
          image_url: string | null
          slug: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          tags: string[] | null
          technologies: string[]
          title: string
        }
        Insert: {
          content?: string | null
          cover_image?: string | null
          demo?: string | null
          description: string
          end_date?: string | null
          featured?: boolean
          github?: string | null
          id?: number
          image_url?: string | null
          slug?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tags?: string[] | null
          technologies: string[]
          title: string
        }
        Update: {
          content?: string | null
          cover_image?: string | null
          demo?: string | null
          description?: string
          end_date?: string | null
          featured?: boolean
          github?: string | null
          id?: number
          image_url?: string | null
          slug?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tags?: string[] | null
          technologies?: string[]
          title?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string | null
          icon: string
          id: number
          platform: string
          url: string
        }
        Insert: {
          created_at?: string | null
          icon: string
          id?: number
          platform: string
          url: string
        }
        Update: {
          created_at?: string | null
          icon?: string
          id?: number
          platform?: string
          url?: string
        }
        Relationships: []
      }
      writings: {
        Row: {
          content: string | null
          cover_image: string | null
          created_at: string | null
          date: string
          description: string | null
          id: number
          metadata: Json | null
          slug: string | null
          tags: string[] | null
          title: string
          type: string
          url: string | null
        }
        Insert: {
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: number
          metadata?: Json | null
          slug?: string | null
          tags?: string[] | null
          title: string
          type: string
          url?: string | null
        }
        Update: {
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: number
          metadata?: Json | null
          slug?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      goal_category: "goal" | "aim" | "note"
      project_status: "draft" | "published" | "archived"
      publication_type: "article" | "paper" | "conference" | "book"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
