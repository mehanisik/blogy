import supabase from "@/db"
import type { Blog } from "@/types/blog"
import type { Project } from "@/types/project"
import type { Publication } from "@/types/publication"


export async function getPublications() {
  const { data, error } = await supabase.from("publications").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching publications:", error)
    return []
  }

  return data as Publication[]
}

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*")

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data as Project[]
}

export async function getBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
    return []
  }

  return data as Blog[]
}

export async function getBlogById(id: number) {
  const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching blog:", error)
    return null
  }

  return data as Blog
}
