import type { Metadata } from "next";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { PageLayout } from "@/components/page-layout";
import { getPublications } from "@/utils/data";
import { PublicationsContent } from "./publications-content";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Publications",
	description:
		"Academic publications and research papers by Mehmet ISIK, covering topics in computer systems, networks, and software engineering.",
	openGraph: {
		title: "Publications | Mehmet ISIK",
		description:
			"Academic publications and research papers by Mehmet ISIK, covering topics in computer systems, networks, and software engineering.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Publications | Mehmet ISIK",
		description:
			"Academic publications and research papers by Mehmet ISIK, covering topics in computer systems, networks, and software engineering.",
	},
	alternates: {
		canonical: "/publications",
	},
};

export default async function PublicationsPage() {
	const publications = await getPublications();

	return (
		<Suspense fallback={<Loader />}>
			<PageLayout className="flex flex-col justify-between w-full h-[calc(100vh-100px)] border-border border-x border-t">
				<main className="py-8 sm:py-12 h-full">
					<header className="mb-8 sm:mb-12">
						<h1 className="text-3xl font-light tracking-tight text-foreground mb-3">
							Publications
						</h1>
						<p className="text-lg text-muted-foreground">
							Here are the my graduation thesis and the papers I have studied
							and worked on during my studies.
						</p>
					</header>

					<PublicationsContent publications={publications} />
				</main>
			</PageLayout>
		</Suspense>
	);
}
