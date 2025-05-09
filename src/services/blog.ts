import supabase from "@/db";
import type { Blog, BlogInsert, BlogUpdate } from "@/types/database.types";
import { createServerFn } from "@tanstack/react-start";
import { handleSupabaseError } from "./supabase-error";

export const fetchBlogsFn = createServerFn({ method: "GET" }).handler(
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

export const fetchBlogByIdFn = createServerFn({ method: "GET" })
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

export const createBlogFn = createServerFn()
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

export const updateBlogFn = createServerFn()
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

export const deleteBlogFn = createServerFn()
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

export const fetchBlogFn = createServerFn()
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
