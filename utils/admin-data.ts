import { supabaseServer } from "@/utils/supabase-server";

export async function getAllPosts() {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.order("date", { ascending: false });

		if (error) {
			console.error("Failed to fetch posts:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

export async function getAllProjects() {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.order("start_date", { ascending: false });

		if (error) {
			console.error("Failed to fetch projects:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error fetching projects:", error);
		return [];
	}
}

export async function getAllPublications() {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("publications")
			.select("*")
			.order("date", { ascending: false });

		if (error) {
			console.error("Failed to fetch publications:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error fetching publications:", error);
		return [];
	}
}

export async function getPostById(id: number) {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.eq("id", id)
			.maybeSingle();

		if (error) {
			console.error("Failed to fetch post:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error fetching post:", error);
		return null;
	}
}
