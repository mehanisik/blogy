import { PageLayout } from "@/components/layout/page-layout";
import ListCard from "@/components/list-card";
import { PendingComponent } from "@/components/pending-component";
import { fetchProjects } from "@/services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
	loader: () => fetchProjects(),
	pendingComponent: () => <PendingComponent title="Projects" />,
	component: Projects,
});

function Projects() {
	const projects = Route.useLoaderData();
	return (
		<PageLayout
			title="Projects"
			description="Explore our portfolio of innovative projects and technical solutions. Discover our work in software development, web applications, and more."
		>
			<div className="grid gap-8">
				{projects?.map((project) => (
					<ListCard
						key={project.id}
						title={project.title}
						description={project.description}
						tags={project.technologies}
						type="project"
						link={project.github || project.demo || ""}
					/>
				))}
			</div>
		</PageLayout>
	);
}
