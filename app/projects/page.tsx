import { ExternalLink, Folder, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PageLayout } from "@/components/page-layout";
import type { Tables } from "@/schemas/supabase";
import { getProjects } from "@/utils/data";
import ProjectsLoading from "./loading";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Projects",
	description:
		"A collection of my software development projects, showcasing my work with React, TypeScript, Next.js, and other modern web technologies.",
	openGraph: {
		title: "Projects | Mehmet ISIK",
		description:
			"A collection of my software development projects, showcasing my work with React, TypeScript, Next.js, and other modern web technologies.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects | Mehmet ISIK",
		description:
			"A collection of my software development projects, showcasing my work with React, TypeScript, Next.js, and other modern web technologies.",
	},
	alternates: {
		canonical: "/projects",
	},
};

type Project = Tables<"projects">;

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<Suspense fallback={<ProjectsLoading />}>
			<PageLayout>
				<main className="py-8 sm:py-12">
					<header className="mb-8 sm:mb-12">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-3 sm:mb-4">
							Projects
						</h1>
						<p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
							Most of my projects are in my github repository{" "}
							<span className="font-bold">
								<a
									href="https://github.com/mehanisik"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:text-primary-hover transition-colors"
								>
									here
								</a>
							</span>
							. Below are some of my projects that i have worked on recently.
						</p>
					</header>
					<section aria-labelledby="projects-heading" className="space-y-6 sm:space-y-8">
						<h2 id="projects-heading" className="sr-only">
							Project Listings
						</h2>
						{projects.map((project: Project, idx) => {
							return (
								<article
									key={project.id}
									className={`flex flex-col lg:flex-row items-stretch overflow-hidden bg-muted/60  dark:bg-muted/40 border-t hover:bg-foreground/10 cursor-pointer  transition-colors duration-300`}
								>
									<div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10 gap-4 min-w-0 lg:max-w-[50%]">
										<div>
											<h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-2 sm:mb-3">
												{project.title}
											</h2>
											<p className="text-sm sm:text-base text-foreground font-light mb-4 sm:mb-6">
												{project.description}
											</p>

											{project.technologies &&
												project.technologies.length > 0 && (
													<div className="mb-4 sm:mb-6">
														<h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 uppercase tracking-wide">
															Technologies
														</h3>
														<div className="flex flex-wrap gap-1 sm:gap-2">
															{project.technologies.map((tech) => (
																<span
																	key={tech}
																	className="px-2 sm:px-3 py-1 bg-background text-foreground text-xs sm:text-sm font-medium rounded-full border"
																>
																	{tech}
																</span>
															))}
														</div>
													</div>
												)}

											{project.tags && project.tags.length > 0 && (
												<div className="mb-6 sm:mb-8">
													<h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 uppercase tracking-wide">
														Tags
													</h3>
													<div className="flex flex-wrap gap-1 sm:gap-2">
														{project.tags.map((tag) => (
															<span
																key={tag}
																className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full"
															>
																{tag}
															</span>
														))}
													</div>
												</div>
											)}
										</div>

										<div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
											{project.demo && (
												<Link
													className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-foreground text-background font-semibold text-sm sm:text-base hover:bg-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
													href={project.demo}
													aria-label={`View live demo of ${project.title}`}
												>
													<ExternalLink
														className="w-3 h-3 sm:w-4 sm:h-4"
														aria-hidden="true"
													/>
													Live Demo
												</Link>
											)}
											{project.github && (
												<Link
													href={project.github}
													className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-foreground text-foreground font-semibold text-sm sm:text-base hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 transition"
													aria-label={`View source code of ${project.title} on GitHub`}
												>
													<Github className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
													Source Code
												</Link>
											)}
											{!project.demo && !project.github && (
												<span className="text-muted-foreground text-xs sm:text-sm">
													No links available
												</span>
											)}
										</div>
									</div>

									<div className="flex-1 flex flex-col justify-center items-center bg-background/80 p-4 sm:p-6 lg:p-8 min-h-[200px] sm:min-h-[250px] lg:min-h-[320px]">
										{project.cover_image ? (
											<Image
												src={project.cover_image}
												alt={`${project.title} cover image`}
												width={400}
												height={320}
												className="rounded-xl object-cover w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] h-auto shadow-lg"
												priority={idx === 0}
											/>
										) : (
											<div className="w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center bg-muted rounded-xl">
												<Folder
													className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground"
													aria-hidden="true"
												/>
											</div>
										)}
									</div>
								</article>
							);
						})}
					</section>

					<div className="sr-only" aria-live="polite">
						Found {projects.length}{" "}
						{projects.length === 1 ? "project" : "projects"}
					</div>
				</main>
			</PageLayout>
		</Suspense>
	);
}
