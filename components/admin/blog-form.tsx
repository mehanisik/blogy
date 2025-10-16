"use client";

import { Eye, EyeOff, Save, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/utils/helpers";
import { Markdown } from "../blog/markdown";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

type BlogFormData = {
	title: string;
	content: string;
	subtitle?: string;
	date: string;
	tags?: string[] | string;
	published?: boolean;
	cover_image?: string;
	slug?: string;
};

interface BlogFormProps {
	item?: BlogFormData;
	onSave: (data: BlogFormData) => void;
	onCancel: () => void;
}

export function BlogForm({ item, onSave, onCancel }: BlogFormProps) {
	const titleId = useId();
	const subtitleId = useId();
	const dateId = useId();
	const slugId = useId();
	const tagsId = useId();
	const coverImageId = useId();
	const publishedId = useId();
	const contentId = useId();

	const [formData, setFormData] = useState<BlogFormData>({
		title: "",
		content: "",
		subtitle: "",
		date: new Date().toISOString().split("T")[0],
		tags: [],
		published: false,
		cover_image: "",
		slug: "",
	});

	const [previewMode, setPreviewMode] = useState(false);
	const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

	useEffect(() => {
		if (item) {
			setFormData({
				...item,
				tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
			});
		}
	}, [item]);

	// Auto-generate slug from title if slug is empty
	useEffect(() => {
		if (formData.title && !formData.slug) {
			const slug = formData.title
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-")
				.trim();
			setFormData((prev) => ({ ...prev, slug }));
		}
	}, [formData.title, formData.slug]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const data = { ...formData };

		// Convert tags string to array
		if (typeof data.tags === "string") {
			data.tags = data.tags
				.split(",")
				.map((t: string) => t.trim())
				.filter(Boolean);
		}

		onSave(data);
	};

	const handleInputChange = (
		field: keyof BlogFormData,
		value: string | boolean,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const estimateReadTime = (content: string): number => {
		const wordsPerMinute = 200;
		const wordCount = content.trim().split(/\s+/).length;
		return Math.ceil(wordCount / wordsPerMinute);
	};

	const readTime = estimateReadTime(formData.content);

	return (
		<div className="w-full max-w-none">
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Header with action buttons */}
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<h2 className="text-2xl font-semibold">
							{item ? "Edit Blog Post" : "Create New Blog Post"}
						</h2>
						<p className="text-sm text-muted-foreground">
							{formData.content &&
								`~${readTime} min read • ${formData.content.length} characters`}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => setPreviewMode(!previewMode)}
							className="flex items-center gap-2"
						>
							{previewMode ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
							{previewMode ? "Hide Preview" : "Show Preview"}
						</Button>
						<Button type="button" variant="outline" onClick={onCancel}>
							<X className="h-4 w-4 mr-2" />
							Cancel
						</Button>
						<Button type="submit">
							<Save className="h-4 w-4 mr-2" />
							{item ? "Update" : "Create"}
						</Button>
					</div>
				</div>

				<Separator />

				{/* Main content area */}
				<div
					className={cn(
						"grid gap-6",
						previewMode ? "grid-cols-2" : "grid-cols-1",
					)}
				>
					{/* Form section */}
					<div className="space-y-6">
						{/* Basic Information */}
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Basic Information</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor={titleId}>Title *</Label>
									<Input
										id={titleId}
										placeholder="Enter blog post title..."
										value={formData.title}
										onChange={(e) => handleInputChange("title", e.target.value)}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor={subtitleId}>Subtitle</Label>
									<Input
										id={subtitleId}
										placeholder="Optional subtitle or description..."
										value={formData.subtitle || ""}
										onChange={(e) =>
											handleInputChange("subtitle", e.target.value)
										}
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor={dateId}>Publication Date *</Label>
										<Input
											id={dateId}
											type="date"
											value={formData.date}
											onChange={(e) =>
												handleInputChange("date", e.target.value)
											}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor={slugId}>URL Slug</Label>
										<Input
											id={slugId}
											placeholder="url-friendly-slug"
											value={formData.slug || ""}
											onChange={(e) =>
												handleInputChange("slug", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor={tagsId}>Tags</Label>
									<Input
										id={tagsId}
										placeholder="react, nextjs, javascript (comma separated)"
										value={
											typeof formData.tags === "string"
												? formData.tags
												: formData.tags?.join(", ") || ""
										}
										onChange={(e) => handleInputChange("tags", e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor={coverImageId}>Cover Image URL</Label>
									<Input
										id={coverImageId}
										placeholder="https://example.com/image.jpg"
										value={formData.cover_image || ""}
										onChange={(e) =>
											handleInputChange("cover_image", e.target.value)
										}
									/>
								</div>

								<div className="flex items-center space-x-2">
									<Switch
										id={publishedId}
										checked={formData.published || false}
										onCheckedChange={(checked) =>
											handleInputChange("published", checked)
										}
									/>
									<Label htmlFor={publishedId}>
										{formData.published ? "Published" : "Draft"}
									</Label>
								</div>
							</CardContent>
						</Card>

						{/* Content Editor */}
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Content</CardTitle>
							</CardHeader>
							<CardContent>
								<Tabs
									value={activeTab}
									onValueChange={(value) =>
										setActiveTab(value as "write" | "preview")
									}
								>
									<TabsList className="grid w-full grid-cols-2">
										<TabsTrigger value="write">Write</TabsTrigger>
										<TabsTrigger value="preview">Preview</TabsTrigger>
									</TabsList>
									<TabsContent value="write" className="space-y-2">
										<Label htmlFor={contentId}>Markdown Content *</Label>
										<Textarea
											id={contentId}
											placeholder="Write your blog post in markdown..."
											value={formData.content}
											onChange={(e) =>
												handleInputChange("content", e.target.value)
											}
											rows={20}
											className="font-mono text-sm"
											required
										/>
										<p className="text-xs text-muted-foreground">
											Supports GitHub Flavored Markdown with syntax highlighting
										</p>
									</TabsContent>
									<TabsContent value="preview" className="space-y-2">
										<div className="min-h-[500px] border rounded-md p-4 bg-background">
											{formData.content ? (
												<Markdown content={formData.content} />
											) : (
												<p className="text-muted-foreground text-center py-8">
													Start writing to see the preview...
												</p>
											)}
										</div>
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					</div>

					{/* Live Preview section (only shown when previewMode is true) */}
					{previewMode && (
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Live Preview</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{/* Preview header */}
										<div className="border-b pb-4">
											<h1 className="text-3xl font-bold">
												{formData.title || "Untitled Post"}
											</h1>
											{formData.subtitle && (
												<p className="text-xl text-muted-foreground mt-2">
													{formData.subtitle}
												</p>
											)}
											<div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
												<span>{formData.date}</span>
												<span>•</span>
												<span>{readTime} min read</span>
												{formData.tags &&
													typeof formData.tags === "string" &&
													formData.tags && (
														<>
															<span>•</span>
															<span>{formData.tags}</span>
														</>
													)}
											</div>
										</div>

										{/* Preview content */}
										<div className="max-h-[600px] overflow-y-auto">
											{formData.content ? (
												<Markdown content={formData.content} />
											) : (
												<p className="text-muted-foreground text-center py-8">
													Start writing to see the preview...
												</p>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
