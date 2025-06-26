import { supabaseStatic } from "@/utils/supabase";
import { supabaseServer } from "@/utils/supabase-server";

export async function getProjects() {
	try {
		const supabase = supabaseStatic();
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.order("start_date", { ascending: false });

		if (error) {
			throw new Error(`Failed to fetch projects: ${error.message}`);
		}

		return data || [];
	} catch (error) {
		throw new Error(
			`Unexpected error fetching projects: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function getPublications() {
	try {
		const supabase = supabaseStatic();
		const { data, error } = await supabase
			.from("publications")
			.select("*")
			.order("date", { ascending: false });

		if (error) {
			throw new Error(`Failed to fetch publications: ${error.message}`);
		}

		return data || [];
	} catch (error) {
		throw new Error(
			`Unexpected error fetching publications: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function getPosts() {
	try {
		const supabase = supabaseStatic();
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.eq("published", true)
			.order("date", { ascending: false });

		if (error) {
			throw new Error(`Failed to fetch posts: ${error.message}`);
		}

		return data || [];
	} catch (error) {
		throw new Error(
			`Unexpected error fetching posts: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function getPostBySlug(slug: string) {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.eq("slug", slug)
			.eq("published", true)
			.single();

		if (error) {
			if (error.code === "PGRST116") {
				throw new Error(`Post with slug "${slug}" not found`);
			}
			throw new Error(`Failed to fetch post: ${error.message}`);
		}

		return data;
	} catch (error) {
		throw new Error(
			`Unexpected error fetching post: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}
