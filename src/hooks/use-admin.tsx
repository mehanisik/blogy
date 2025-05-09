import {
	handleDeleteBlogFn,
	handleLogoutFn,
	handleSaveBlogFn,
} from "@/services/admin";
import type { Blog } from "@/types/database.types";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function useAdminBlogs(initialBlogs: Blog[] = []) {
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
	const [isPublished, setIsPublished] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

	useEffect(() => {
		if (selectedBlog) {
			setTitle(selectedBlog.title);
			setContent(selectedBlog.content);
			setIsPublished(selectedBlog.published);
			setIsEditing(true);
		} else {
			setTitle("");
			setContent("");
			setIsPublished(false);
		}
	}, [selectedBlog]);

	useEffect(() => {
		setBlogs(initialBlogs);
	}, [initialBlogs]);

	const startEditing = () => {
		setIsEditing(true);
	};

	const selectBlog = (blog: Blog) => {
		setSelectedBlog(blog);
	};

	const resetForm = () => {
		setIsEditing(false);
		setSelectedBlog(null);
		setTitle("");
		setContent("");
		setIsPublished(false);
	};

	const handleLogout = async () => {
		try {
			setIsLoading(true);
			await handleLogoutFn();
			navigate({ to: "/sign-in", search: { redirect: undefined } });
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteBlog = async (id: number) => {
		if (!confirm("Are you sure you want to delete this blog post?")) return;

		try {
			setIsLoading(true);
			await handleDeleteBlogFn({ data: id });
			setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
			resetForm();
		} finally {
			setIsLoading(false);
		}
	};

	const handleSaveBlog = async () => {
		if (!title.trim() || !content.trim()) return;

		try {
			setIsLoading(true);

			const blogData = {
				id: selectedBlog?.id,
				title,
				content,
				isPublished,
			};

			const savedBlog = await handleSaveBlogFn({ data: blogData });
			if (!savedBlog) {
				throw new Error("Failed to save blog");
			}

			if (selectedBlog) {
				setBlogs((prevBlogs) =>
					prevBlogs.map((blog) =>
						blog.id === selectedBlog.id ? savedBlog : blog,
					),
				);
			} else {
				setBlogs((prevBlogs) => [...prevBlogs, savedBlog]);
			}

			resetForm();
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid = title.trim() !== "" && content.trim() !== "";

	return {
		blogs,
		title,
		setTitle,
		content,
		setContent,
		selectedBlog,
		setSelectedBlog,
		isPublished,
		setIsPublished,
		isEditing,
		setIsEditing,
		isLoading,
		isFormValid,
		startEditing,
		selectBlog,
		resetForm,
		handleLogout,
		handleDeleteBlog,
		handleSaveBlog,
	};
}
