import PageLayout from "@/components/layout/page-layout";
import ListCard from "@/components/list-card";
import { PendingComponent } from "@/components/pending-component";
import { fetchPublications } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileText } from "lucide-react";

export const Route = createFileRoute("/publications")({
	component: Publications,
	loader: () => fetchPublications(),
	pendingComponent: () => <PendingComponent title="Publications" />,
});

function Publications() {
	const publications = Route.useLoaderData();

	return (
		<PageLayout title="Publications">
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
						tags={[publication.journal]}
						rightAction={
							<div className="flex gap-2">
								{publication.doi && (
									<a
										href={`https://doi.org/${publication.doi}`}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
									>
										<FileText className="h-4 w-4" />
									</a>
								)}
								{publication.pdf && (
									<a
										href={publication.pdf}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
									>
										<ExternalLink className="h-4 w-4" />
									</a>
								)}
							</div>
						}
					/>
				))}
			</div>
		</PageLayout>
	);
}
