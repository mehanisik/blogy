import { supabaseClient, supabaseStatic } from "@/utils/supabase";
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

export async function getProjectBySlug(slug: string) {
	try {
		const supabase = await supabaseServer();
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.eq("slug", slug)
			.single();

		if (error) {
			if (error.code === "PGRST116") {
				throw new Error(`Project with slug "${slug}" not found`);
			}
			throw new Error(`Failed to fetch project: ${error.message}`);
		}

		return data;
	} catch (error) {
		throw new Error(
			`Unexpected error fetching project: ${error instanceof Error ? error.message : "Unknown error"}`,
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

export async function createPost(formData: FormData) {
	try {
		const supabase = await supabaseServer();

		const title = formData.get("title") as string;
		const content = formData.get("content") as string;
		const slug = formData.get("slug") as string;
		const published = formData.get("published") === "true";
		const date = (formData.get("date") as string) || new Date().toISOString();
		const read_time = formData.get("read_time")
			? Number(formData.get("read_time"))
			: null;
		const cover_image = (formData.get("cover_image") as string) || null;
		const tags = formData.get("tags")
			? (formData.get("tags") as string).split(",").map((tag) => tag.trim())
			: null;

		if (!title || !content || !slug) {
			throw new Error(
				"Missing required fields: title, content, and slug are required",
			);
		}

		const postData = {
			title,
			content,
			slug,
			published,
			date,
			read_time,
			cover_image,
			tags,
		};

		const { data, error } = await supabase.from("blogs").insert(postData);

		if (error) {
			throw new Error(`Failed to create post: ${error.message}`);
		}

		return data;
	} catch (error) {
		throw new Error(
			`Unexpected error creating post: ${error instanceof Error ? error.message : "Unknown error"}`,
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

export async function deletePost(slug: string) {
	try {
		const supabase = await supabaseServer();

		const { data, error } = await supabase
			.from("blogs")
			.delete()
			.eq("slug", slug)
			.select();

		if (error) {
			throw new Error(`Failed to delete post: ${error.message}`);
		}

		if (!data || data.length === 0) {
			throw new Error(`Post with slug "${slug}" not found`);
		}

		return data;
	} catch (error) {
		throw new Error(
			`Unexpected error deleting post: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function signIn(formData: FormData) {
	try {
		const supabase = supabaseClient();
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		if (!email || !password) {
			throw new Error("Email and password are required");
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new Error(`Failed to sign in: ${error.message}`);
		}

		return data;
	} catch (error) {
		throw new Error(
			`Unexpected error during sign in: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function signOut() {
	try {
		const supabase = supabaseClient();
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new Error(`Failed to sign out: ${error.message}`);
		}

		return { success: true };
	} catch (error) {
		throw new Error(
			`Unexpected error during sign out: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function getCurrentUser() {
	try {
		const supabase = await supabaseServer();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error) {
			throw new Error(`Failed to get current user: ${error.message}`);
		}

		return user;
	} catch (error) {
		throw new Error(
			`Unexpected error getting current user: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function getSession() {
	try {
		const supabase = await supabaseServer();
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();

		if (error) {
			throw new Error(`Failed to get session: ${error.message}`);
		}

		return session;
	} catch (error) {
		throw new Error(
			`Unexpected error getting session: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}
