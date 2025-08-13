import { supabaseServer } from "../supabase/server";

export const getProjects = async () => {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.order("start_date", { ascending: false });
		if (error) {
			throw new Error(error.message || "Failed to fetch projects");
		}
		return data;
	} catch {
		return [];
	}
};

export const getProjectById = async (id: number) => {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.eq("id", id);
		if (error) {
			throw new Error(error.message || "Failed to fetch project by id");
		}
		return data[0];
	} catch {
		return null;
	}
};

export const getPublications = async () => {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("publications")
			.select("*")
			.order("date", { ascending: false });
		if (error) {
			throw new Error(error.message || "Failed to fetch publications");
		}
		return data;
	} catch {
		return [];
	}
};

export const getPublicationById = async (id: number) => {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("publications")
			.select("*")
			.eq("id", id);
		if (error) {
			throw new Error(error.message || "Failed to fetch publication by id");
		}
		return data[0];
	} catch {
		return null;
	}
};

export const getPosts = async () => {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.order("date", { ascending: false });
		if (error) {
			throw new Error(error.message || "Failed to fetch posts");
		}
		return data;
	} catch {
		return [];
	}
};

export const getPostById = async (id: number) => {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.eq("id", id);
		if (error) {
			throw new Error(error.message || "Failed to fetch post by slug");
		}
		return data[0];
	} catch {
		return null;
	}
};
