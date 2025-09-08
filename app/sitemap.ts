import type { MetadataRoute } from "next";
import type { Tables } from "@/types/supabase";
import { getBaseUrl } from "@/utils/helpers";
import {
	getPosts,
	getProjects,
	getPublications,
} from "@/utils/helpers/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl();

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
		{ url: `${baseUrl}/posts`, changeFrequency: "weekly", priority: 0.8 },
		{ url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.7 },
		{
			url: `${baseUrl}/publications`,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{ url: `${baseUrl}/tracker`, changeFrequency: "weekly", priority: 0.4 },
		{ url: `${baseUrl}/resume`, changeFrequency: "yearly", priority: 0.5 },
		{
			url: `${baseUrl}/legal/privacy`,
			changeFrequency: "yearly",
			priority: 0.1,
		},
		{ url: `${baseUrl}/legal/terms`, changeFrequency: "yearly", priority: 0.1 },
	];

	const posts = (await getPosts().catch(() => [])) as Tables<"blogs">[];
	const projects = (await getProjects().catch(
		() => [],
	)) as Tables<"projects">[];
	const publications = (await getPublications().catch(
		() => [],
	)) as Tables<"publications">[];

	const postEntries: MetadataRoute.Sitemap = posts
		.filter((p) => p.published)
		.map((p) => ({
			url: `${baseUrl}/posts/${p.id}`,
			lastModified: p.updated_at ?? p.date ?? undefined,
			changeFrequency: "monthly",
			priority: 0.7,
		}));

	const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
		url: `${baseUrl}/projects/${p.id}`,
		lastModified: p.end_date ?? p.start_date ?? undefined,
		changeFrequency: "monthly",
		priority: 0.6,
	}));

	const publicationEntries: MetadataRoute.Sitemap = publications.map((p) => ({
		url: `${baseUrl}/publications/${p.id}`,
		lastModified: p.date ?? undefined,
		changeFrequency: "yearly",
		priority: 0.5,
	}));

	return [
		...staticRoutes,
		...postEntries,
		...projectEntries,
		...publicationEntries,
	];
}
