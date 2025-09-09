import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { Tables } from "@/types/supabase";
import { MotionCard, MotionContainer } from "@/utils/motion/motion-components";

export function ProjectsGrid({ projects }: { projects: Tables<"projects">[] }) {
	return (
		<MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 min-h-[72vh]">
			{projects?.map((project) => (
				<MotionCard
					key={project.id}
					className="group relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6 hover:bg-card/80 hover:border-border/60 transition-all duration-500 ease-out"
				>
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1 min-w-0">
							<h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
								{project.title}
							</h3>
							{project.start_date && (
								<div className="text-xs text-muted-foreground mt-1 font-mono">
									{new Date(project.start_date).getFullYear()}
									{project.end_date &&
										project.end_date !== project.start_date &&
										` — ${new Date(project.end_date).getFullYear()}`}
								</div>
							)}
						</div>

						<div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
							{project.github && (
								<Link
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
								>
									<Github className="w-4 h-4" />
								</Link>
							)}
							{project.demo && (
								<Link
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
								>
									<ExternalLink className="w-4 h-4" />
								</Link>
							)}
						</div>
					</div>

					{project.description && (
						<p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
							{project.description}
						</p>
					)}

					{project.technologies && project.technologies.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-6">
							{project.technologies.slice(0, 3).map((tech) => (
								<span
									key={tech}
									className="text-xs px-2 py-1 bg-muted/40 text-muted-foreground rounded-md font-mono"
								>
									{tech}
								</span>
							))}
							{project.technologies.length > 3 && (
								<span className="text-xs px-2 py-1 bg-muted/40 text-muted-foreground rounded-md font-mono">
									+{project.technologies.length - 3}
								</span>
							)}
						</div>
					)}

					<Link
						href={`/projects/${project.id}`}
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mt-auto group/link"
					>
						<span>View details</span>
						<ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
					</Link>

					<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
				</MotionCard>
			))}
		</MotionContainer>
	);
}
