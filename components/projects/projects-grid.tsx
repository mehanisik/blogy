import { ArrowRight, Calendar, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Tables } from "@/types/supabase";
import { Card } from "../ui/card";

export function ProjectsGrid({ projects }: { projects: Tables<"projects">[] }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-5 min-h-[72vh]">
			{projects?.map((project) => (
				<Card
					key={project.id}
					className="w-full h-full border border-muted hover:border-muted-foreground/20 transition-colors rounded-xl shadow-none"
				>
					<div>
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
								{project.title}
							</h3>
						</div>

						<p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-muted-foreground/80 transition-colors duration-200">
							{project.description}
						</p>

						{project.technologies && project.technologies.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{project.technologies.slice(0, 3).map((tech) => (
									<Badge
										key={tech}
										variant="outline"
										className="text-xs transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
									>
										{tech}
									</Badge>
								))}
								{project.technologies.length > 3 && (
									<Badge
										variant="outline"
										className="text-xs transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
									>
										+{project.technologies.length - 3}
									</Badge>
								)}
							</div>
						)}
					</div>

					<div className="mt-auto pt-4 border-t border-muted group-hover:border-muted-foreground/20 transition-colors duration-200">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								{project.start_date && (
									<div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200">
										<Calendar className="w-3 h-3" />
										<span>
											{new Date(project.start_date).getFullYear()}
											{project.end_date &&
												` - ${new Date(project.end_date).getFullYear()}`}
										</span>
									</div>
								)}

								{(project.github || project.demo) && project.start_date && (
									<div className="w-px h-3 bg-border group-hover:bg-border/70 transition-colors duration-200" />
								)}

								<div className="flex items-center gap-1">
									{project.github && (
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													asChild
													variant="ghost"
													size="sm"
													className="h-6 w-6 p-0 text-muted-foreground/60 hover:text-muted-foreground hover:bg-accent/50 transition-colors duration-200"
												>
													<Link
														href={project.github}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Github className="w-3 h-3" />
													</Link>
												</Button>
											</TooltipTrigger>
											<TooltipContent>View on GitHub</TooltipContent>
										</Tooltip>
									)}
									{project.demo && (
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													asChild
													variant="ghost"
													size="sm"
													className="h-6 w-6 p-0 text-muted-foreground/60 hover:text-muted-foreground hover:bg-accent/50 transition-colors duration-200"
												>
													<Link
														href={project.demo}
														target="_blank"
														rel="noopener noreferrer"
													>
														<ExternalLink className="w-3 h-3" />
													</Link>
												</Button>
											</TooltipTrigger>
											<TooltipContent>Live Demo</TooltipContent>
										</Tooltip>
									)}
								</div>
							</div>

							<Button
								asChild
								variant="ghost"
								size="sm"
								className="text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 h-7 px-2 transition-colors duration-200"
							>
								<Link href={`/projects/${project.id}`}>
									View Details
									<ArrowRight className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
}
