import { getProjects } from "@/services"
import type {Project} from "@/types/project"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/projects")({
  loader: () => ({
    projectsQuery: {
      queryKey: ["projects"],
      queryFn: getProjects,
    },
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const { projectsQuery } = Route.useLoaderData()
  const { data: projects = [], isLoading, isError } = useQuery(projectsQuery)

  if (isLoading) {
    return <div className="py-8 text-center">Loading projects...</div>
  }

  if (isError) {
    return <div className="py-8 text-center">Error loading projects. Please try again later.</div>
  }

  return (
    <main className="flex flex-col gap-10">
      <section className="mt-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight mb-6">Projects</h1>

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <div className="grid gap-8">
            {projects.map((project: Project) => (
              <article key={project.id} className="border-b border-gray-100 pb-6">
                <h2 className="text-xl font-serif font-semibold mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech) => (
                    <span key={tech.trim()} className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <p className="text-base text-gray-700 mb-4">{project.description}</p>
                <div className="flex gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      [ Live Demo ]
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      [ GitHub ]
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
