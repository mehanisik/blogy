import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

type FormData = {
	title: string;
	content: string;
	date: string;
	description?: string;
	authors?: string;
	technologies?: string[] | string;
	keywords?: string[] | string;
	doi?: string;
	status?: string;
	demo?: string;
	github?: string;
	subtitle?: string;
	tags?: string[] | string;
	published?: boolean;
};

export function ItemForm<T extends "publications" | "projects" | "blogs">({
	table,
	item,
	onSave,
	onCancel,
}: {
	table: T;
	item?: FormData;
	onSave: (data: FormData) => void;
	onCancel: () => void;
}) {
	const [formData, setFormData] = useState<FormData>({
		title: "",
		content: "",
		date: new Date().toISOString().split("T")[0],
	});

	useEffect(() => {
		if (item) {
			setFormData(item);
		} else {
			const defaults: FormData = {
				title: "",
				content: "",
				date: new Date().toISOString().split("T")[0],
			};
			if (table === "publications" || table === "projects") {
				defaults.description = "";
			}
			if (table === "publications") defaults.authors = "";
			if (table === "projects") defaults.technologies = [];
			if (table === "blogs") {
				defaults.published = true;
				defaults.subtitle = "";
			}
			setFormData(defaults);
		}
	}, [item, table]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const data = { ...formData };

		if (table === "projects" && typeof data.technologies === "string") {
			data.technologies = data.technologies
				.split(",")
				.map((t: string) => t.trim())
				.filter(Boolean);
		}
		if (table === "blogs" && typeof data.tags === "string") {
			data.tags = data.tags
				.split(",")
				.map((t: string) => t.trim())
				.filter(Boolean);
		}
		if (table === "publications" && typeof data.keywords === "string") {
			data.keywords = data.keywords
				.split(",")
				.map((t: string) => t.trim())
				.filter(Boolean);
		}

		onSave(data);
	};

	const renderFields = () => {
		const fields = [];

		// Common fields
		fields.push(
			<Input
				key="title"
				placeholder="Title"
				value={formData.title || ""}
				onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				required
			/>,
		);

		if (table === "publications" || table === "projects") {
			fields.push(
				<Textarea
					key="description"
					placeholder="Description"
					value={formData.description || ""}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
					required={table === "publications" || table === "projects"}
				/>,
			);
		}

		fields.push(
			<Textarea
				key="content"
				placeholder="Content"
				value={formData.content || ""}
				onChange={(e) => setFormData({ ...formData, content: e.target.value })}
				rows={4}
				required={table === "blogs"}
			/>,
		);

		if (table === "publications") {
			fields.push(
				<Input
					key="authors"
					placeholder="Authors"
					value={formData.authors || ""}
					onChange={(e) =>
						setFormData({ ...formData, authors: e.target.value })
					}
					required
				/>,
				<Input
					key="date"
					type="date"
					value={formData.date || ""}
					onChange={(e) => setFormData({ ...formData, date: e.target.value })}
					required
				/>,
				<Input
					key="keywords"
					placeholder="Keywords (comma separated)"
					value={
						Array.isArray(formData.keywords)
							? formData.keywords.join(", ")
							: formData.keywords || ""
					}
					onChange={(e) =>
						setFormData({ ...formData, keywords: e.target.value })
					}
				/>,
				<Input
					key="doi"
					placeholder="DOI"
					value={formData.doi || ""}
					onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
				/>,
			);
		}

		if (table === "projects") {
			fields.push(
				<Input
					key="technologies"
					placeholder="Technologies (comma separated)"
					value={
						Array.isArray(formData.technologies)
							? formData.technologies.join(", ")
							: formData.technologies || ""
					}
					onChange={(e) =>
						setFormData({ ...formData, technologies: e.target.value })
					}
					required
				/>,
				<Select
					key="status"
					value={formData.status || "draft"}
					onValueChange={(value) => setFormData({ ...formData, status: value })}
				>
					<SelectTrigger>
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="draft">Draft</SelectItem>
						<SelectItem value="published">Published</SelectItem>
						<SelectItem value="archived">Archived</SelectItem>
					</SelectContent>
				</Select>,
				<Input
					key="demo"
					placeholder="Demo URL"
					value={formData.demo || ""}
					onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
				/>,
				<Input
					key="github"
					placeholder="GitHub URL"
					value={formData.github || ""}
					onChange={(e) => setFormData({ ...formData, github: e.target.value })}
				/>,
			);
		}

		if (table === "blogs") {
			fields.push(
				<Input
					key="subtitle"
					placeholder="Subtitle"
					value={formData.subtitle || ""}
					onChange={(e) =>
						setFormData({ ...formData, subtitle: e.target.value })
					}
				/>,
				<Input
					key="date"
					type="date"
					value={formData.date || ""}
					onChange={(e) => setFormData({ ...formData, date: e.target.value })}
					required
				/>,
				<Input
					key="tags"
					placeholder="Tags (comma separated)"
					value={
						Array.isArray(formData.tags)
							? formData.tags.join(", ")
							: formData.tags || ""
					}
					onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
				/>,
				<div key="published" className="flex items-center space-x-2">
					<Switch
						checked={formData.published || false}
						onCheckedChange={(checked) =>
							setFormData({ ...formData, published: checked })
						}
					/>
					<Label>Published</Label>
				</div>,
			);
		}

		return fields;
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{renderFields()}
			<div className="flex gap-2 justify-end">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">{item ? "Update" : "Create"}</Button>
			</div>
		</form>
	);
}
