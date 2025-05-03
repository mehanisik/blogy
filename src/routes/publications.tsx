import { PageLayout } from "@/components/layout/page-layout";
import ListCard from "@/components/list-card";
import { PendingComponent } from "@/components/pending-component";
import { fetchPublications } from "@/services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/publications")({
	component: Publications,
	loader: () => fetchPublications(),
	pendingComponent: () => <PendingComponent title="Publications" />,
});

function Publications() {
	const publications = Route.useLoaderData();

	return (
		<PageLayout
			title="Publications"
			description="Explore my collection of academic publications and research papers as a software engineer. Discover insights and findings from my research and writing."
			keywords={[
				"publications",
				"research papers",
				"academic papers",
				"journal articles",
				"research findings",
				"academic research",
				"software engineering",
				"computer science",
				"artificial intelligence",
				"machine learning",
				"data science",
				"research papers",
			]}
		>
			<div className="grid gap-8">
				{publications.map((publication) => (
					<ListCard
						key={publication.id}
						title={publication.title}
						date={new Date(publication.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
						description={publication.abstract}
						tags={publication.journal}
						type="publication"
						link={publication.doi ? publication.doi : publication.pdf || ""}
					/>
				))}
			</div>
		</PageLayout>
	);
}
