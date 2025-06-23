import type { MetadataRoute } from "next";
import env from "@/utils/env";

const baseUrl = env.BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	try {
		const staticRoutes = ["", "/posts", "/projects", "/publications"].map(
			(route) => ({
				url: `${baseUrl}${route}`,
				lastModified: new Date().toISOString(),
				changeFrequency: "weekly" as const,
				priority: route === "" ? 1 : 0.8,
			}),
		);

		// TODO: Add dynamic routes from database
		// const blogs = await getBlogPosts();
		// const blogRoutes = blogs.map((post) => ({
		// 	url: `${baseUrl}/posts/${post.slug}`,
		// 	lastModified: post.metadata.publishedAt,
		// 	changeFrequency: "monthly" as const,
		// 	priority: 0.6,
		// }));

		return [...staticRoutes];
	} catch (error) {
		console.error("Error generating sitemap:", error);
		return [
			{
				url: baseUrl,
				lastModified: new Date().toISOString(),
				changeFrequency: "weekly" as const,
				priority: 1,
			},
		];
	}
}
