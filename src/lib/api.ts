import {
  education,
  experience,
  hero,
  skills,
  socialLinks,
} from "../data/portfolio";
import type { Database } from "./database.types";
import { supabase } from "./supabase";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Blog = Database["public"]["Tables"]["blogs"]["Row"];
export type Publication = Database["public"]["Tables"]["publications"]["Row"];

export interface Experience {
  id?: number;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Education {
  id?: number;
  school: string;
  location: string;
  degree: string;
  date: string;
}

export interface Skill {
  id?: number;
  category: string;
  items: string[];
}

export interface Hero {
  id?: number;
  name: string;
  tagline: string;
  role: string;
  location: string;
  summary: string;
  avatar_url?: string | null;
  contact?: {
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
  return (data as Project[]) || [];
}

export async function getBlogs() {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  return (data as Blog[]) || [];
}

export async function getPublications() {
  const { data } = await supabase
    .from("publications")
    .select("*")
    .order("date", { ascending: false });
  return (data as Publication[]) || [];
}

export async function getExperience() {
  return experience as Experience[];
}

export async function getEducation() {
  return education as Education[];
}

export async function getSkills() {
  // Transform portfolio.ts skills object to array format expected by components
  const transformedSkills: Skill[] = [
    { category: "languages", items: skills.languages },
    { category: "frameworks", items: skills.frameworks },
    { category: "tools", items: skills.tools },
  ];
  return transformedSkills;
}

export async function getHero() {
  return hero as unknown as Hero;
}

export async function getSocialLinks() {
  return socialLinks as SocialLink[];
}
