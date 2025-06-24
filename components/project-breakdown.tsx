import { Clock, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { WakaTimeStats } from "@/types/wakatime";

interface ProjectBreakdownProps {
	stats: WakaTimeStats;
}

export function ProjectBreakdown({ stats }: ProjectBreakdownProps) {
	const data = stats.data;

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
	};

	if (!data.projects || data.projects.length === 0) {
		return (
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Folder className="h-5 w-5" />
						<h2 className="text-xl font-semibold">Projects</h2>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-center py-8">
						No project data available
					</p>
				</CardContent>
			</Card>
		);
	}

	const topProjects = data.projects.slice(0, 5);

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Folder className="h-5 w-5" />
					<h2 className="text-xl font-semibold">Projects</h2>
				</div>
				<p className="text-sm text-muted-foreground">
					Most active projects this week
				</p>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="space-y-3">
						{topProjects.map((project, index) => (
							<div
								key={project.name}
								className={`p-3 rounded-lg border transition-all ${
									index === 0
										? "border-primary/20 bg-primary/5"
										: "border-border bg-card"
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="text-lg">
											<Folder className="h-5 w-5" />
										</div>
										<div>
											<h3 className="font-medium text-sm">{project.name}</h3>
											<div className="flex items-center gap-2 mt-1">
												<Clock className="h-3 w-3 text-muted-foreground" />
												<span className="text-xs text-muted-foreground">
													{formatTime(project.total_seconds)}
												</span>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Badge
											variant={index === 0 ? "default" : "secondary"}
											className="text-xs"
										>
											{project.percent}%
										</Badge>
										{index === 0 && (
											<Badge variant="outline" className="text-xs">
												Primary
											</Badge>
										)}
									</div>
								</div>

								<div className="mt-3 w-full bg-muted rounded-full h-1.5">
									<div
										className={`h-1.5 rounded-full transition-all duration-300 ${
											index === 0 ? "bg-primary" : "bg-muted-foreground"
										}`}
										style={{ width: `${project.percent}%` }}
									/>
								</div>
							</div>
						))}
					</div>

					<div className="grid grid-cols-3 gap-4 pt-4 border-t">
						<div className="text-center">
							<p className="text-lg font-bold text-primary">
								{topProjects.length}
							</p>
							<p className="text-xs text-muted-foreground">Active Projects</p>
						</div>
						<div className="text-center">
							<p className="text-lg font-bold text-primary">
								{topProjects[0]?.name || "N/A"}
							</p>
							<p className="text-xs text-muted-foreground">Main Project</p>
						</div>
						<div className="text-center">
							<p className="text-lg font-bold text-primary">
								{Math.round(topProjects[0]?.percent || 0)}%
							</p>
							<p className="text-xs text-muted-foreground">Focus</p>
						</div>
					</div>

					{data.projects.length > 5 && (
						<div className="pt-4 border-t">
							<p className="text-sm font-medium mb-2">Other Projects</p>
							<div className="flex flex-wrap gap-2">
								{data.projects.slice(5).map((project) => (
									<Badge
										key={project.name}
										variant="outline"
										className="text-xs"
									>
										{project.name} ({project.percent}%)
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
