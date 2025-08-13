import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProjectDetailLoader from "@/components/loaders/project-detail-loader";
import { ProjectDetail } from "@/components/projects/project-detail";
import { env } from "@/env";
import { siteConfig } from "@/siteconfig";
import { getProjectById } from "@/utils/helpers/queries";

export async function generateMetadata(props: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await props.params;
	const idNum = Number(id);
	const url = `${env.NEXT_PUBLIC_BASE_URL}/projects/${id}`;
	if (Number.isNaN(idNum)) {
		return {
			title: "Project",
			description: siteConfig.seo.description,
			alternates: { canonical: url },
		};
	}
	const project = await getProjectById(idNum);

	const title = project?.title ?? "Project";
	const description = project?.description ?? siteConfig.seo.description;
	const ogImage =
		project?.cover_image ??
		project?.image_url ??
		siteConfig.seo.openGraph.imagePath;

	return {
		title,
		description,
		keywords: project?.tags ?? siteConfig.seo.keywords,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
			site: siteConfig.seo.twitter.site,
			creator: siteConfig.seo.twitter.creator,
		},
	};
}

export default async function ProjectDetailPage(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await props.params;
	const project = await getProjectById(Number(id));
	if (!project) return notFound();
	return (
		<Suspense fallback={<ProjectDetailLoader />}>
			<ProjectDetail project={project} />
		</Suspense>
	);
}
