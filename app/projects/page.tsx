import { Calendar, ExternalLink, Folder, Github } from "lucide-react";
import { Suspense } from "react";
import { PageLayout } from "@/components/page-layout";
import { getProjects } from "@/utils/data";
import ProjectsLoading from "./loading";

export const revalidate = 3600;

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<Suspense fallback={<ProjectsLoading />}>
			<PageLayout>
				<div className="py-16">
					<div className="space-y-12">
						{projects.length === 0 ? (
							<div className="py-24 text-center animate-fade-in">
								<div className="space-y-4">
									<div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
										<Folder className="w-8 h-8 text-gray-400" />
									</div>
									<p className="text-gray-500 dark:text-gray-500">
										No projects available yet.
									</p>
									<p className="text-sm text-gray-400 dark:text-gray-600">
										Add some projects to your Supabase database to see them
										here.
									</p>
								</div>
							</div>
						) : (
							<div className="grid gap-8">
								{projects.map((project, index) => (
									<article
										key={project.id}
										className="group border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up"
										style={{
											animationDelay: `${index * 100}ms`,
											animationFillMode: "both",
										}}
									>
										<div className="space-y-4">
											<div className="space-y-3">
												<h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
													{project.title}
												</h2>
												<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
													{project.description}
												</p>
											</div>

											{project.technologies &&
												project.technologies.length > 0 && (
													<div className="flex flex-wrap gap-2">
														{project.technologies.map((tech, techIndex) => (
															<span
																key={tech}
																className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
																style={{
																	animationDelay: `${index * 100 + techIndex * 50}ms`,
																	animationFillMode: "both",
																}}
															>
																{tech}
															</span>
														))}
													</div>
												)}

											<div className="flex items-center justify-between">
												<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
													<div className="flex items-center gap-1">
														<Calendar className="w-4 h-4" />
														<span>
															{new Date(
																project.start_date ?? "",
															).toLocaleDateString("en-US", {
																year: "numeric",
																month: "long",
															})}
														</span>
													</div>
												</div>

												<div className="flex items-center gap-3">
													{project.github && (
														<a
															href={project.github}
															target="_blank"
															rel="noopener noreferrer"
															className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 flex items-center gap-1 hover:scale-105"
														>
															<Github className="w-4 h-4" />
															GitHub
														</a>
													)}
													{project.demo && (
														<a
															href={project.demo}
															target="_blank"
															rel="noopener noreferrer"
															className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 flex items-center gap-1 hover:scale-105"
														>
															<ExternalLink className="w-4 h-4" />
															Live Demo
														</a>
													)}
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						)}
					</div>
				</div>
			</PageLayout>
		</Suspense>
	);
}
