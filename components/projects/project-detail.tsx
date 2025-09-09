import {
	ArrowLeft,
	Calendar,
	Code,
	ExternalLink,
	Github,
	Globe,
	Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/blog/markdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tables } from "@/types/supabase";
import {
	calculateDurationDaysString,
	formatMonthYearLong,
} from "@/utils/helpers/date";

export function ProjectDetail({ project }: { project?: Tables<"projects"> }) {
	if (!project) return notFound();
	const duration = calculateDurationDaysString(
		project.start_date || "",
		project.end_date || "",
	);

	return (
		<div className="w-full py-5 space-y-6">
			<Link
				href="/projects"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeft className="w-4 h-4" />
				Back
			</Link>
			<div className="mb-12">
				<div className="flex items-start justify-between gap-4 mb-6">
					<h1 className="text-3xl font-medium flex-1">{project.title}</h1>
					<div className="flex gap-2 flex-shrink-0">
						{project.status && (
							<Badge variant="outline" className="text-xs">
								{project.status}
							</Badge>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{(project.start_date || project.end_date) && (
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm font-medium">
								<Calendar className="w-4 h-4" />
								Timeline
							</div>
							<div className="text-sm text-muted-foreground space-y-1">
								{project.start_date && (
									<div>Started: {formatMonthYearLong(project.start_date)}</div>
								)}
								{project.end_date && (
									<div>Completed: {formatMonthYearLong(project.end_date)}</div>
								)}
								{duration && (
									<div className="text-xs">Duration: {duration}</div>
								)}
							</div>
						</div>
					)}

					{project.technologies && project.technologies.length > 0 && (
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm font-medium">
								<Code className="w-4 h-4" />
								Technologies
							</div>
							<div className="flex flex-wrap gap-1">
								{project.technologies.map((tech) => (
									<Badge key={tech} variant="outline" className="text-xs">
										{tech}
									</Badge>
								))}
							</div>
						</div>
					)}

					{(project.github || project.demo) && (
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm font-medium">
								<Globe className="w-4 h-4" />
								Links
							</div>
							<div className="space-y-1">
								{project.github && (
									<Link
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										<Github className="w-4 h-4" />
										<span>GitHub</span>
									</Link>
								)}
								{project.demo && (
									<Link
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										<ExternalLink className="w-4 h-4" />
										<span>Demo</span>
									</Link>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<div className="lg:col-span-3 space-y-8">
					{project.image_url && (
						<div className="relative w-full h-80 rounded-lg overflow-hidden border">
							<Image
								src={project.image_url}
								alt={project.title}
								fill
								className="object-cover"
								priority
							/>
						</div>
					)}

					{project.description && (
						<div className="space-y-3">
							<h2 className="text-lg font-medium flex items-center gap-2">
								<Tag className="w-5 h-5" />
								About
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{project.description}
							</p>
						</div>
					)}

					{project.content && (
						<div className="space-y-3">
							<h2 className="text-lg font-medium flex items-center gap-2">
								<Code className="w-5 h-5" />
								Details
							</h2>
							<div className="prose prose-neutral dark:prose-invert max-w-none">
								<Markdown content={project.content} />
							</div>
						</div>
					)}
				</div>

				<div className="space-y-6">
					<Card className="border-0 shadow-none">
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">Info</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">Status</span>
								<Badge variant="outline" className="text-xs">
									{project.status || "draft"}
								</Badge>
							</div>
							{project.content && (
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">Content</span>
									<Badge variant="outline" className="text-xs">
										Markdown
									</Badge>
								</div>
							)}
						</CardContent>
					</Card>

					{project.technologies && project.technologies.length > 0 && (
						<Card className="border-0 shadow-none">
							<CardHeader className="pb-3">
								<CardTitle className="text-base font-medium">Stack</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									{project.technologies.map((tech) => (
										<div key={tech} className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
											<span className="text-sm">{tech}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{(project.github || project.demo) && (
						<Card className="border-0 shadow-none">
							<CardHeader className="pb-3">
								<CardTitle className="text-base font-medium">Actions</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{project.github && (
									<Link
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors text-sm"
									>
										<Github className="w-4 h-4" />
										<span>Source Code</span>
									</Link>
								)}
								{project.demo && (
									<Link
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors text-sm"
									>
										<ExternalLink className="w-4 h-4" />
										<span>Live Demo</span>
									</Link>
								)}
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
