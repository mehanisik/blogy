import Layout from "@/components/layout/layout";
import ListCard from "@/components/list-card";
import { fetchProjects } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";

export const Route = createFileRoute("/projects")({
	loader: () => fetchProjects(),
	component: Projects,
});

function Projects() {
	const projects = Route.useLoaderData();

	return (
		<Layout>
			<div className="py-12 px-4">
				<h1 className="text-2xl font-medium mb-2">Projects</h1>
				<div className="w-20 h-1 bg-gradient-to-r from-gray-200 to-gray-300 mb-10" />

				{projects.length === 0 ? (
					<div className="py-8 text-center border-b border-gray-200">
						<p className="text-gray-500">No projects found.</p>
					</div>
				) : (
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
				)}
			</div>
		</Layout>
	);
}
