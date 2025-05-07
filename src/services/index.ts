import supabase from "@/db";
import type {
	Blog,
	BlogInsert,
	BlogUpdate,
	Project,
	Publication,
} from "@/types/database.types";
import { notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleSupabaseError = (error: any) => {
	if (error.code === "PGRST116" || error.code === "404") {
		throw notFound();
	}

	if (error.code === "401" || error.status === 401) {
		return redirect({
			to: "/sign-in",
			search: {
				redirect: "/admin",
			},
		});
	}

	throw new Error(`Database error: ${error.message || "Unknown error"}`);
};

export const fetchPublications = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const { data } = await supabase
				.from("publications")
				.select("*")
				.order("date", { ascending: false });

			return data as Publication[];
		} catch (err) {
			handleSupabaseError(err);
		}
	},
);

export const fetchProjects = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const { data } = await supabase.from("projects").select("*");

			return data as Project[];
		} catch (err) {
			handleSupabaseError(err);
		}
	},
);

export const fetchBlogs = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const { data } = await supabase
				.from("blogs")
				.select("*")
				.eq("published", true)
				.order("date", { ascending: false });

			return data as Blog[];
		} catch (err) {
			handleSupabaseError(err);
		}
	},
);

export const fetchBlogById = createServerFn({ method: "GET" })
	.validator((id) => {
		const numId = Number(id);
		if (Number.isNaN(numId)) {
			throw new Error("Blog ID must be a valid number");
		}
		return numId;
	})
	.handler(async ({ data: blogId }) => {
		try {
			const { data } = await supabase
				.from("blogs")
				.select("*")
				.eq("id", blogId)
				.single();

			return data as Blog;
		} catch (err) {
			handleSupabaseError(err);
		}
	});

export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error) {
			console.warn("Auth check error:", error);
			return { authenticated: false };
		}

		if (!user) {
			return { authenticated: false };
		}

		const { id, email, user_metadata, app_metadata } = user;
		return {
			authenticated: true,
			user: { id, email, user_metadata, app_metadata },
		};
	} catch (error) {
		console.error("Error checking authentication:", error);
		return { authenticated: false };
	}
});

export const signinFn = createServerFn()
	.validator((d) => d as { email: string; password: string })
	.handler(async ({ data }) => {
		const { email, password } = data;

		if (!email || !password) {
			return {
				error: true,
				message: "Please enter both email and password",
			};
		}

		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (signInError) {
			return {
				error: true,
				message: signInError.message,
			};
		}

		return { succes: true };
	});

export const createBlog = createServerFn()
	.validator((blog: unknown) => {
		if (!blog || typeof blog !== "object") {
			throw new Error("Invalid blog data");
		}

		return blog as BlogInsert;
	})
	.handler(async ({ data: blog }) => {
		try {
			const { data: result } = await supabase
				.from("blogs")
				.insert([blog])
				.select()
				.single();

			return result as Blog;
		} catch (err) {
			handleSupabaseError(err);
		}
	});

export const updateBlog = createServerFn()
	.validator((input: unknown) => {
		if (!input || typeof input !== "object") {
			throw new Error("Invalid input data");
		}

		const typedInput = input as { id?: number; blog?: BlogUpdate };

		if (typedInput.id === undefined || typeof typedInput.id !== "number") {
			throw new Error("Blog ID is required and must be a number");
		}

		if (!typedInput.blog || typeof typedInput.blog !== "object") {
			throw new Error("Blog update data is required");
		}

		return { id: typedInput.id, blog: typedInput.blog as BlogUpdate };
	})
	.handler(async ({ data: { id, blog } }) => {
		try {
			const { data: result } = await supabase
				.from("blogs")
				.update(blog)
				.eq("id", id)
				.select()
				.single();

			return result as Blog;
		} catch (err) {
			handleSupabaseError(err);
		}
	});

export const deleteBlog = createServerFn()
	.validator((id: unknown) => {
		const numId = Number(id);
		if (Number.isNaN(numId)) {
			throw new Error("Blog ID must be a valid number");
		}
		return numId;
	})
	.handler(async ({ data: id }) => {
		try {
			await supabase.from("blogs").delete().eq("id", id);

			return { success: true };
		} catch (err) {
			handleSupabaseError(err);
		}
	});

export const fetchBlog = createServerFn()
	.validator((id: unknown) => {
		const numId = Number(id);
		if (Number.isNaN(numId)) {
			throw new Error("Blog ID must be a valid number");
		}
		return numId;
	})
	.handler(async ({ data: id }) => {
		try {
			const { data: result } = await supabase
				.from("blogs")
				.select("*")
				.eq("id", id)
				.single();

			return result as Blog;
		} catch (err) {
			handleSupabaseError(err);
		}
	});

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return {
				success: false,
				error: true,
				message: error.message,
			};
		}

		return { success: true };
	} catch (err) {
		handleSupabaseError(err);
	}
});
