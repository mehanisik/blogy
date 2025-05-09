import supabase from "@/db";
import type { BlogInsert, BlogUpdate } from "@/types/database.types";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createBlogFn, deleteBlogFn, updateBlogFn } from "./blog";
import { handleSupabaseError } from "./supabase-error";

export const handleLogoutFn = createServerFn({ method: "POST" }).handler(
	async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (!error) {
				redirect({ to: "/sign-in", search: { redirect: undefined } });
			}
		} catch (err) {
			handleSupabaseError(err);
		}
	},
);

export const handleDeleteBlogFn = createServerFn()
	.validator((id: unknown) => {
		const numId = Number(id);
		if (Number.isNaN(numId)) {
			throw new Error("Blog ID must be a valid number");
		}
		return numId;
	})
	.handler(async ({ data: id }) => {
		try {
			await deleteBlogFn({ data: id });
			return { success: true };
		} catch (error) {
			handleSupabaseError(error);
		}
	});

export const handleSaveBlogFn = createServerFn()
	.validator((blogData: unknown) => {
		if (!blogData || typeof blogData !== "object") {
			throw new Error("Invalid blog data");
		}

		const data = blogData as {
			id?: number;
			title: string;
			content: string;
			isPublished: boolean;
		};

		if (!data.title || !data.content) {
			throw new Error("Title and content are required");
		}

		return data;
	})
	.handler(async ({ data }) => {
		try {
			const { id, title, content, isPublished } = data;

			if (id) {
				const updatedBlog: BlogUpdate = {
					title,
					content,
					published: isPublished,
				};
				const savedBlog = await updateBlogFn({
					data: { id, blog: updatedBlog },
				});
				return savedBlog;
			}

			const newBlog: BlogInsert = {
				title,
				content,
				published: isPublished,
				date: new Date().toISOString(),
			};
			const savedBlog = await createBlogFn({ data: newBlog });
			return savedBlog;
		} catch (error) {
			handleSupabaseError(error);
		}
	});
