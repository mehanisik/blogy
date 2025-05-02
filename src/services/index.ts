import supabase from "@/db";
import type {
	Project,
	Publication,
	Blog,
	BlogInsert,
	BlogUpdate,
} from "@/types/database.types";
import type { UserData } from "@/types/user-data";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const fetchPublications = createServerFn({ method: "GET" }).handler(
	async () => {
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

export const fetchUser = createServerFn({ method: "GET" })
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

export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error || !user) {
			return { authenticated: false };
		}

		const { id, email, user_metadata, app_metadata } = user;
		return {
			authenticated: true,
			user: { id, email, user_metadata, app_metadata },
		};
	} catch (error) {
		console.error(error);
		return { authenticated: false };
	}
});

export const signIn = createServerFn()
	.validator((d: unknown) => d as { email: string; password: string })
	.handler(async ({ data }) => {
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			return {
				error: true,
				message: error.message,
			};
		}

		return { success: true };
	});

export const createBlog = createServerFn()
	.validator((blog: BlogInsert) => blog)
	.handler(async ({ data: blog }) => {
		const { data: result, error } = await supabase
			.from("blogs")
			.insert([blog])
			.select()
			.single();

		if (error) throw error;
		return result as Blog;
	});

export const updateBlog = createServerFn()
	.validator((input: { id: number; blog: BlogUpdate }) => input)
	.handler(async ({ data: { id, blog } }) => {
		const { data: result, error } = await supabase
			.from("blogs")
			.update(blog)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return result as Blog;
	});

export const deleteBlog = createServerFn()
	.validator((id: number) => id)
	.handler(async ({ data: id }) => {
		const { error } = await supabase.from("blogs").delete().eq("id", id);

		if (error) throw error;
		return { success: true };
	});

export const fetchBlog = createServerFn()
	.validator((id: number) => id)
	.handler(async ({ data: id }) => {
		const { data: result, error } = await supabase
			.from("blogs")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return result as Blog;
	});

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		return { error: true, message: error.message };
	}
	return { success: true };
});
