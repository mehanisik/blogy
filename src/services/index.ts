import supabase from "@/db";
import type { Blog } from "@/types/blog";
import type { Project } from "@/types/project";
import type { Publication } from "@/types/publication";
import type { UserData } from "@/types/user-data";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const fetchPublications = createServerFn({ method: "GET" }).handler(
	async () => {
		await new Promise((resolve) => setTimeout(resolve, 6000));
		const { data, error } = await supabase
			.from("publications")
			.select("*")
			.order("date", { ascending: false });
		if (error) {
			if (error.code == "404") {
				throw notFound();
			}
			throw Error;
		}
		return data as Publication[];
	},
);

export const fetchProjects = createServerFn({ method: "GET" }).handler(
	async () => {
		await new Promise((resolve) => setTimeout(resolve, 6000));
		const { data, error } = await supabase.from("projects").select("*");
		if (error) {
			if (error.code == "404") {
				throw notFound();
			}
			throw Error;
		}
		return data as Project[];
	},
);

export const fetchBlogs = createServerFn({ method: "GET" }).handler(
	async () => {
		await new Promise((resolve) => setTimeout(resolve, 6000));
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.eq("published", true)
			.order("date", { ascending: false });

		if (error) {
			if (error.code == "404") {
				throw notFound();
			}
			throw Error;
		}
		return data as Blog[];
	},
);

export const fetchBlogById = createServerFn({ method: "GET" })
	.validator((d: number) => d)
	.handler(async ({ data: blogId }) => {
		const { data, error } = await supabase
			.from("blogs")
			.select("*")
			.eq("id", blogId)
			.single();
		if (error) {
			if (error.code == "404") {
				throw notFound();
			}
			throw Error;
		}
		return data as Blog;
	});

export const getUser = createServerFn({ method: "GET" })
	.validator((d: unknown) => d as void)
	.handler(async () => {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();
		if (error) {
			console.warn("Auth error:", error);
			return null;
		}
		if (!user) return null;

		const { id, email, user_metadata, app_metadata } = user;
		return { id, email, user_metadata, app_metadata } as UserData;
	});
