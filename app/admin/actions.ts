"use server";

import { redirect } from "next/navigation";

import { supabaseServer } from "@/utils/supabase-server";

export async function login(formData: FormData) {
	const supabase = await supabaseServer();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		throw new Error(`Error signing in: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function logout() {
	const supabase = await supabaseServer();

	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(`Error signing out: ${error.message}`);
	}

	redirect("/admin");
}

export async function createPost(formData: FormData) {
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

	const { error } = await supabase.from("blogs").insert({
		title,
		content,
		slug,
		published,
		date,
		read_time,
		cover_image,
		tags,
	});

	if (error) {
		throw new Error(`Failed to create post: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function updatePost(formData: FormData) {
	const supabase = await supabaseServer();

	const id = Number(formData.get("id"));
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;
	const slug = formData.get("slug") as string;
	const published = formData.get("published") === "true";
	const date = formData.get("date") as string;
	const read_time = formData.get("read_time")
		? Number(formData.get("read_time"))
		: null;
	const cover_image = (formData.get("cover_image") as string) || null;
	const tags = formData.get("tags")
		? (formData.get("tags") as string).split(",").map((tag) => tag.trim())
		: null;

	if (!id || !title || !content || !slug) {
		throw new Error("Missing required fields");
	}

	const { error } = await supabase
		.from("blogs")
		.update({
			title,
			content,
			slug,
			published,
			date,
			read_time,
			cover_image,
			tags,
		})
		.eq("id", id);

	if (error) {
		throw new Error(`Failed to update post: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function deletePostForm(formData: FormData) {
	const supabase = await supabaseServer();
	const id = formData.get("id") as string;

	const { error } = await supabase.from("blogs").delete().eq("id", Number(id));

	if (error) {
		throw new Error(`Failed to delete post: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function deletePost(id: string) {
	const supabase = await supabaseServer();

	const { error } = await supabase.from("blogs").delete().eq("id", Number(id));

	if (error) {
		throw new Error(`Failed to delete post: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function createProject(formData: FormData) {
	const supabase = await supabaseServer();

	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const start_date = formData.get("start_date") as string;
	const end_date = (formData.get("end_date") as string) || null;
	const featured = formData.get("featured") === "true";
	const github = (formData.get("github") as string) || null;
	const demo = (formData.get("demo") as string) || null;
	const technologies = formData.get("technologies")
		? (formData.get("technologies") as string)
				.split(",")
				.map((tech) => tech.trim())
		: [];

	if (!title || !description || !start_date) {
		throw new Error(
			"Missing required fields: title, description, and start_date are required",
		);
	}

	const { error } = await supabase.from("projects").insert({
		title,
		description,
		start_date,
		end_date,
		featured,
		github,
		demo,
		technologies,
	});

	if (error) {
		throw new Error(`Failed to create project: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function updateProject(formData: FormData) {
	const supabase = await supabaseServer();

	const id = Number(formData.get("id"));
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const start_date = formData.get("start_date") as string;
	const end_date = (formData.get("end_date") as string) || null;
	const featured = formData.get("featured") === "true";
	const github = (formData.get("github") as string) || null;
	const demo = (formData.get("demo") as string) || null;
	const technologies = formData.get("technologies")
		? (formData.get("technologies") as string)
				.split(",")
				.map((tech) => tech.trim())
		: [];

	if (!id || !title || !description || !start_date) {
		throw new Error("Missing required fields");
	}

	const { error } = await supabase
		.from("projects")
		.update({
			title,
			description,
			start_date,
			end_date,
			featured,
			github,
			demo,
			technologies,
		})
		.eq("id", id);

	if (error) {
		throw new Error(`Failed to update project: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function deleteProjectForm(formData: FormData) {
	const supabase = await supabaseServer();
	const id = formData.get("id") as string;

	const { error } = await supabase
		.from("projects")
		.delete()
		.eq("id", Number(id));

	if (error) {
		throw new Error(`Failed to delete project: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function deleteProject(id: string) {
	const supabase = await supabaseServer();

	const { error } = await supabase
		.from("projects")
		.delete()
		.eq("id", Number(id));

	if (error) {
		throw new Error(`Failed to delete project: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function createPublication(formData: FormData) {
	const supabase = await supabaseServer();

	const title = formData.get("title") as string;
	const abstract = formData.get("abstract") as string;
	const authors = formData.get("authors") as string;
	const date = formData.get("date") as string;
	const doi = (formData.get("doi") as string) || null;
	const pdf = (formData.get("pdf") as string) || null;
	const journal = formData.get("journal")
		? (formData.get("journal") as string).split(",").map((j) => j.trim())
		: [];
	const institution = (formData.get("institution") as string) || null;

	if (!title || !abstract || !authors || !date) {
		throw new Error(
			"Missing required fields: title, abstract, authors, and date are required",
		);
	}

	const { error } = await supabase.from("publications").insert({
		title,
		abstract,
		authors,
		date,
		doi,
		pdf,
		journal,
		institution,
	});

	if (error) {
		throw new Error(`Failed to create publication: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function updatePublication(formData: FormData) {
	const supabase = await supabaseServer();

	const id = Number(formData.get("id"));
	const title = formData.get("title") as string;
	const abstract = formData.get("abstract") as string;
	const authors = formData.get("authors") as string;
	const date = formData.get("date") as string;
	const doi = (formData.get("doi") as string) || null;
	const pdf = (formData.get("pdf") as string) || null;
	const journal = formData.get("journal")
		? (formData.get("journal") as string).split(",").map((j) => j.trim())
		: [];
	const institution = (formData.get("institution") as string) || null;

	if (!id || !title || !abstract || !authors || !date) {
		throw new Error("Missing required fields");
	}

	const { error } = await supabase
		.from("publications")
		.update({
			title,
			abstract,
			authors,
			date,
			doi,
			pdf,
			journal,
			institution,
		})
		.eq("id", id);

	if (error) {
		throw new Error(`Failed to update publication: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function deletePublicationForm(formData: FormData) {
	const supabase = await supabaseServer();
	const id = formData.get("id") as string;

	const { error } = await supabase
		.from("publications")
		.delete()
		.eq("id", Number(id));

	if (error) {
		throw new Error(`Failed to delete publication: ${error.message}`);
	}

	redirect("/admin/dashboard");
}

export async function deletePublication(id: string) {
	const supabase = await supabaseServer();

	const { error } = await supabase
		.from("publications")
		.delete()
		.eq("id", Number(id));

	if (error) {
		throw new Error(`Failed to delete publication: ${error.message}`);
	}

	redirect("/admin/dashboard");
}
