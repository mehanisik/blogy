import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-8">Projects</h1>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <div key={index} className="border-b border-gray-100 pb-8 last:border-0">
            <h2 className="text-lg font-medium">{project.title}</h2>
            <p className="text-gray-700 mt-2 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="text-xs text-gray-500">
                  {tech}
                  {techIndex < project.technologies.length - 1 ? " •" : ""}
                </span>
              ))}
            </div>
            <div>
              {project.github && (
                <a href={project.github} className="text-sm text-blue-600 mr-4">
                  GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} className="text-sm text-blue-600">
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with React and TanStack Router.",
    technologies: ["React", "TanStack Router", "TanStack Query", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
  {
    title: "Task Management App",
    description: "A productivity application for managing tasks and projects with team collaboration.",
    technologies: ["React", "TypeScript", "TanStack Query", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing projects and skills.",
    technologies: ["React", "TanStack Router", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
]
