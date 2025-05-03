import PageLayout from "@/components/layout/page-layout";
import ListCard from "@/components/list-card";
import { PendingComponent } from "@/components/pending-component";
import { fetchProjects } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";

export const Route = createFileRoute("/projects")({
	loader: () => fetchProjects(),
	pendingComponent: () => <PendingComponent title="Projects" />,
	component: Projects,
});

function Projects() {
	const projects = Route.useLoaderData();

	return (
		<PageLayout title="Projects">
			<div className="grid gap-8">
				{projects.map((project) => (
					<ListCard
						key={project.id}
						title={project.title}
						date={""}
						description={project.description}
						tags={project.technologies}
						rightAction={
							<div className="flex gap-2">
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
									>
										<Github className="h-4 w-4" />
									</a>
								)}
								{project.demo && (
									<a
										href={project.demo}
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
