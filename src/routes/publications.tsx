import Layout from "@/components/layout/layout";
import ListCard from "@/components/list-card";
import { fetchPublications } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileText } from "lucide-react";

export const Route = createFileRoute("/publications")({
	component: Publications,
	loader: () => fetchPublications(),
});

function Publications() {
	const publications = Route.useLoaderData();

	return (
		<Layout>
			<div className="py-12 px-4">
				<h1 className="text-2xl font-medium mb-2">Publications</h1>

				{publications.length === 0 ? (
					<div className="py-8 text-center border-b border-gray-200">
						<p className="text-gray-500">No publications found.</p>
					</div>
				) : (
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
				)}
			</div>
		</Layout>
	);
}
