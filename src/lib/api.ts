import type { Database } from "./database.types";
import { supabase } from "./supabase";

export interface Project {
  id: number;
  title: string;
  description: string;
  link?: string;
  demo?: string;
  github?: string;
  technologies?: string[];
  date?: string;
  start_date?: string;
  image_url?: string;
}

export type Writing = Database["public"]["Tables"]["writings"]["Row"];

export interface WritingMetadata {
  doi?: string;
  pdf?: string;
  authors?: string;
  journal?: string[];
  citation?: string;
  publisher?: string;
  page_count?: number;
  institution?: string;
  read_time?: number;
  view_count?: number;
  published?: boolean;
}

export interface Hero {
  id: number;
  name: string;
  tagline: string;
  role: string;
  location: string;
  summary: string;
  avatar_url?: string | null;
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    phone?: string;
  };
}

export interface SocialLink {
  id?: number;
  label: string;
  href: string;
  icon: string;
}

export async function getProjects() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  return (data as unknown as Project[]) || [];
}

export async function getWritings() {
  const { data } = await supabase
    .from("writings")
    .select("*")
    .order("date", { ascending: false });

  return (data as Writing[]) || [];
}

export async function getHero() {
  const { data } = await supabase.from("hero").select("*").limit(1).single();

  return (data as unknown as Hero) || null;
}

export async function getSocialLinks() {
  const hero = await getHero();
  if (!hero || !hero.contact) return [];

  const links: SocialLink[] = [];
  if (hero.contact.linkedin)
    links.push({
      label: "LinkedIn",
      href: hero.contact.linkedin,
      icon: "linkedin",
    });
  if (hero.contact.github)
    links.push({ label: "GitHub", href: hero.contact.github, icon: "github" });
  if (hero.contact.email)
    links.push({
      label: "Email",
      href: `mailto:${hero.contact.email}`,
      icon: "email",
    });

  return links;
}
