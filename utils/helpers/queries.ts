"use server";
import { unstable_cache } from "next/cache";
import { supabaseServer } from "../supabase/server";

const CACHE_DURATION = 3600; // 1 hour

const getProjects = async () => {
	const supabase = await supabaseServer();
	return unstable_cache(
		async () => {
			const { data, error } = await supabase
				.from("projects")
				.select("*")
				.order("start_date", { ascending: false });
			if (error) {
				throw new Error(error.message || "Failed to fetch projects");
			}
			return data;
		},
		["projects"],
		{
			tags: ["projects"],
			revalidate: CACHE_DURATION,
		},
	)();
};

const getProjectById = async (id: number) => {
	const supabase = await supabaseServer();
	const cachedFunction = unstable_cache(
		async () => {
			const { data, error } = await supabase
				.from("projects")
				.select("*")
				.eq("id", id);
			if (error) {
				throw new Error(error.message || "Failed to fetch project by id");
			}
			return data[0];
		},
		["project-by-id", id.toString()],
		{
			tags: ["projects"],
			revalidate: CACHE_DURATION,
		},
	);
	return cachedFunction();
};

const getPublications = async () => {
	const supabase = await supabaseServer();
	return unstable_cache(
		async () => {
			const { data, error } = await supabase
				.from("publications")
				.select("*")
				.order("date", { ascending: false });
			if (error) {
				throw new Error(error.message || "Failed to fetch publications");
			}
			return data;
		},
		["publications"],
		{
			tags: ["publications"],
			revalidate: CACHE_DURATION,
		},
	)();
};

const getPublicationById = async (id: number) => {
	const supabase = await supabaseServer();
	const cachedFunction = unstable_cache(
		async () => {
			const { data, error } = await supabase
				.from("publications")
				.select("*")
				.eq("id", id);
			if (error) {
				throw new Error(error.message || "Failed to fetch publication by id");
			}
			return data[0];
		},
		["publication-by-id", id.toString()],
		{
			tags: ["publications"],
			revalidate: CACHE_DURATION,
		},
	);
	return cachedFunction();
};

const getPosts = async () => {
	const supabase = await supabaseServer();
	return unstable_cache(
		async () => {
			const { data, error } = await supabase
				.from("blogs")
				.select("*")
				.order("date", { ascending: false });
			if (error) {
				throw new Error(error.message || "Failed to fetch posts");
			}
			return data;
		},
		["posts"],
		{
			tags: ["posts"],
			revalidate: CACHE_DURATION,
		},
	)();
};

const getPostById = async (id: number) => {
	const supabase = await supabaseServer();
	const cachedFunction = unstable_cache(
		async () => {
			const { data, error } = await supabase
				.from("blogs")
				.select("*")
				.eq("id", id);
			if (error) {
				throw new Error(error.message || "Failed to fetch post by slug");
			}
			return data[0];
		},
		["post-by-id", id.toString()],
		{
			tags: ["posts"],
			revalidate: CACHE_DURATION,
		},
	);
	return cachedFunction();
};

export {
	getProjects,
	getProjectById,
	getPublications,
	getPublicationById,
	getPosts,
	getPostById,
};
