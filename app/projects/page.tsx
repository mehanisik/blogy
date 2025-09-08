import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsLoader from "@/components/loaders/projects-loader";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";
import { getProjects } from "@/utils/helpers/queries";

export const metadata: Metadata = {
	title: "Projects",
	description: `Browse projects by ${siteConfig.seo.authorName} including web apps, tools, and experiments.`,
	alternates: { canonical: `${getBaseUrl()}/projects` },
	openGraph: {
		title: "Projects",
		description: `Browse projects by ${siteConfig.seo.authorName} including web apps, tools, and experiments.`,
		url: `${getBaseUrl()}/projects`,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: "Projects",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects",
		description: `Browse projects by ${siteConfig.seo.authorName} including web apps, tools, and experiments.`,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<Suspense fallback={<ProjectsLoader />}>
			<ProjectsGrid projects={projects} />
		</Suspense>
	);
}
