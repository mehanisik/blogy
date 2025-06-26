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

export async function deletePost(id: string) {
	const supabase = await supabaseServer();

	const { error } = await supabase.from("blogs").delete().eq("id", Number(id));

	if (error) {
		throw new Error(`Failed to delete post: ${error.message}`);
	}

	redirect("/admin/dashboard");
}
