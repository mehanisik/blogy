"use client";

import { Edit, LogOut, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow as UITableRow,
} from "@/components/ui/table";
import type { Database } from "@/types/supabase";
import { supabaseClient } from "@/utils/supabase/client";
import { ItemForm } from "./item-form";

type Tables = Database["public"]["Tables"];
type TableName = "publications" | "projects" | "blogs";
type Publication = Tables["publications"]["Row"];
type Project = Tables["projects"]["Row"];
type Blog = Tables["blogs"]["Row"];
type DataRow = Publication | Project | Blog;

// Form data type that matches what ItemForm expects
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

const TABLES: { name: TableName; label: string }[] = [
	{ name: "publications", label: "Publications" },
	{ name: "projects", label: "Projects" },
	{ name: "blogs", label: "Blogs" },
];

// Type guards
function isPublication(item: DataRow): item is Publication {
	return "authors" in item;
}

function isProject(item: DataRow): item is Project {
	return "technologies" in item;
}

function isBlog(item: DataRow): item is Blog {
	return "published" in item;
}

// Convert DataRow to FormData
function convertToFormData(item: DataRow, _table: TableName): FormData {
	const formData: FormData = {
		title: item.title,
		content: item.content || "",
		date: "",
	};

	if (isPublication(item)) {
		formData.date = item.date;
		formData.description = item.description;
		formData.authors = item.authors;
		formData.keywords = item.keywords || [];
		formData.doi = item.doi || "";
	} else if (isProject(item)) {
		formData.date = item.start_date || "";
		formData.description = item.description;
		formData.technologies = item.technologies;
		formData.status = item.status || "draft";
		formData.demo = item.demo || "";
		formData.github = item.github || "";
	} else if (isBlog(item)) {
		formData.date = item.date;
		formData.subtitle = item.subtitle || "";
		formData.tags = item.tags || [];
		formData.published = item.published;
	}

	return formData;
}

export function AdminDashboard() {
	const [activeTable, setActiveTable] = useState<TableName>("publications");
	const [data, setData] = useState<DataRow[]>([]);
	const [editingItem, setEditingItem] = useState<DataRow | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const fetchData = useCallback(async () => {
		setLoading(true);
		const { data: result } = await supabaseClient
			.from(activeTable)
			.select("*")
			.order("id", { ascending: false });
		setData(result || []);
		setLoading(false);
	}, [activeTable]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleSave = async (formData: FormData) => {
		try {
			if (!formData.title?.toString().trim()) {
				alert("Title is required");
				return;
			}

			if (
				formData.date &&
				typeof formData.date === "string" &&
				!formData.date.includes("T")
			) {
				formData.date = new Date(formData.date).toISOString();
			}

			if (editingItem) {
				let updateData: Record<string, unknown> = {
					title: formData.title,
					content: formData.content,
				};

				if (activeTable === "publications") {
					updateData = {
						...updateData,
						date: formData.date,
						description: formData.description,
						authors: formData.authors,
						keywords: formData.keywords,
						doi: formData.doi,
					};
				} else if (activeTable === "projects") {
					updateData = {
						...updateData,
						start_date: formData.date,
						description: formData.description,
						technologies: formData.technologies,
						status: formData.status as "draft" | "published" | "archived",
						demo: formData.demo,
						github: formData.github,
					};
				} else if (activeTable === "blogs") {
					updateData = {
						...updateData,
						date: formData.date,
						subtitle: formData.subtitle,
						tags: formData.tags,
						published: formData.published,
					};
				}

				const result = await supabaseClient
					.from(activeTable)
					.update(updateData as Tables[TableName]["Update"])
					.eq("id", editingItem.id)
					.select();

				if (result.error) {
					alert(`Error: ${result.error.message}`);
					return;
				}
			} else {
				let insertData: Record<string, unknown> = {
					title: formData.title,
					content: formData.content,
				};

				if (activeTable === "publications") {
					insertData = {
						...insertData,
						date: formData.date,
						description: formData.description || "",
						authors: formData.authors || "",
						keywords: formData.keywords || [],
						doi: formData.doi || null,
					};
				} else if (activeTable === "projects") {
					insertData = {
						...insertData,
						start_date: formData.date,
						description: formData.description || "",
						technologies: formData.technologies || [],
						status:
							(formData.status as "draft" | "published" | "archived") ||
							"draft",
						demo: formData.demo || null,
						github: formData.github || null,
					};
				} else if (activeTable === "blogs") {
					insertData = {
						...insertData,
						date: formData.date,
						subtitle: formData.subtitle || null,
						tags: formData.tags || [],
						published: formData.published || true,
					};
				}

				const result = await supabaseClient
					.from(activeTable)
					.insert([insertData] as Tables[TableName]["Insert"][])
					.select();

				if (result.error) {
					alert(`Error: ${result.error.message}`);
					return;
				}
			}

			setIsDialogOpen(false);
			setEditingItem(null);
			fetchData();
		} catch (error) {
			alert(`Failed to save item: ${error}`);
		}
	};

	const handleDelete = async (id: number) => {
		await supabaseClient.from(activeTable).delete().eq("id", id);
		fetchData();
	};

	return (
		<div className="p-3 md:p-3 w-full min-h-[70vh]">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Admin Dashboard</h1>
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => supabaseClient.auth.signOut()}
					>
						<LogOut className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="flex gap-2 mb-6">
				{TABLES.map(({ name, label }) => (
					<Button
						key={name}
						variant={activeTable === name ? "default" : "outline"}
						onClick={() => setActiveTable(name)}
					>
						{label}
					</Button>
				))}
			</div>

			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold capitalize">{activeTable}</h2>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							onClick={() => {
								setEditingItem(null);
								setIsDialogOpen(true);
							}}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add {activeTable.slice(0, -1)}
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>
								{editingItem ? "Edit" : "Create"} {activeTable.slice(0, -1)}
							</DialogTitle>
						</DialogHeader>
						<ItemForm
							table={activeTable}
							item={
								editingItem
									? convertToFormData(editingItem, activeTable)
									: undefined
							}
							onSave={handleSave}
							onCancel={() => setIsDialogOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<UITableRow>
							<TableHead>Title</TableHead>
							{(activeTable === "publications" ||
								activeTable === "projects") && (
								<TableHead>Description</TableHead>
							)}
							{activeTable === "blogs" && <TableHead>Subtitle</TableHead>}
							{activeTable === "publications" && <TableHead>Authors</TableHead>}
							{activeTable === "projects" && (
								<TableHead>Technologies</TableHead>
							)}
							{activeTable === "blogs" && <TableHead>Published</TableHead>}
							<TableHead>Date</TableHead>
							<TableHead className="w-24">Actions</TableHead>
						</UITableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<UITableRow>
								<TableCell colSpan={6} className="text-center py-8">
									Loading...
								</TableCell>
							</UITableRow>
						) : data.length === 0 ? (
							<UITableRow>
								<TableCell colSpan={6} className="text-center py-8">
									No {activeTable} found
								</TableCell>
							</UITableRow>
						) : (
							data.map((item) => (
								<UITableRow key={item.id}>
									<TableCell className="font-medium max-w-xs truncate">
										{item.title}
									</TableCell>
									{(activeTable === "publications" ||
										activeTable === "projects") && (
										<TableCell className="max-w-sm truncate">
											{isPublication(item) || isProject(item)
												? item.description
												: ""}
										</TableCell>
									)}
									{activeTable === "blogs" && (
										<TableCell className="max-w-sm truncate">
											{isBlog(item) ? item.subtitle : ""}
										</TableCell>
									)}
									{activeTable === "publications" && (
										<TableCell>
											{isPublication(item) ? item.authors : ""}
										</TableCell>
									)}
									{activeTable === "projects" && (
										<TableCell>
											<div className="flex flex-wrap gap-1">
												{isProject(item) &&
													item.technologies?.slice(0, 2).map((tech: string) => (
														<Badge
															key={crypto.randomUUID()}
															variant="secondary"
															className="text-xs"
														>
															{tech}
														</Badge>
													))}
												{isProject(item) && item.technologies?.length > 2 && (
													<Badge variant="outline" className="text-xs">
														+{item.technologies.length - 2}
													</Badge>
												)}
											</div>
										</TableCell>
									)}
									{activeTable === "blogs" && (
										<TableCell>
											<Badge
												variant={
													isBlog(item) && item.published
														? "default"
														: "secondary"
												}
											>
												{isBlog(item) && item.published ? "Published" : "Draft"}
											</Badge>
										</TableCell>
									)}
									<TableCell>
										{isPublication(item)
											? item.date
											: isProject(item)
												? item.start_date || ""
												: isBlog(item)
													? item.date
													: ""}
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												size="sm"
												variant="outline"
												onClick={() => {
													setEditingItem(item);
													setIsDialogOpen(true);
												}}
											>
												<Edit className="h-4 w-4" />
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button size="sm" variant="destructive">
														<Trash2 className="h-4 w-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Delete {item.title}?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDelete(item.id)}
															className="bg-destructive text-destructive-foreground"
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</TableCell>
								</UITableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
