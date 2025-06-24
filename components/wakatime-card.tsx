import { Clock, Code, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { WakaTimeStats } from "@/types/wakatime";

interface WakaTimeCardProps {
	stats: WakaTimeStats;
}

export function WakaTimeCard({ stats }: WakaTimeCardProps) {
	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours}h ${minutes}m`;
	};

	const data = stats.data;

	const hasData = data.total_seconds && data.total_seconds > 0;
	const hasLanguages = data.languages && data.languages.length > 0;
	const hasProjects = data.projects && data.projects.length > 0;

	if (!hasData && !hasLanguages && !hasProjects) {
		return (
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Clock className="h-4 w-4 sm:h-5 sm:w-5" />
						<h2 className="text-lg sm:text-xl font-semibold">Coding Activity</h2>
					</div>
					<p className="text-xs sm:text-sm text-muted-foreground">
						No recent coding activity found
					</p>
				</CardHeader>
				<CardContent>
					<div className="text-center py-6 sm:py-8">
						<p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
							No coding activity detected in the last 7 days.
						</p>
						<p className="text-xs sm:text-sm text-muted-foreground">
							Make sure you have the WakaTime extension installed in your editor
							and have been coding recently.
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Clock className="h-4 w-4 sm:h-5 sm:w-5" />
					<h2 className="text-lg sm:text-xl font-semibold">Coding Activity</h2>
				</div>
				<p className="text-xs sm:text-sm text-muted-foreground">
					Last {data.days_minus_holidays || 0} days
				</p>
			</CardHeader>
			<CardContent className="space-y-4 sm:space-y-6">
				<div className="grid grid-cols-2 gap-3 sm:gap-4">
					<div className="space-y-1 sm:space-y-2">
						<p className="text-xs sm:text-sm font-medium">Total Time</p>
						<p className="text-lg sm:text-2xl font-bold">
							{data.human_readable_total || formatTime(data.total_seconds || 0)}
						</p>
					</div>
					<div className="space-y-1 sm:space-y-2">
						<p className="text-xs sm:text-sm font-medium">Best Day</p>
						{data.best_day ? (
							<>
								<p className="text-sm sm:text-lg font-semibold">{data.best_day.text}</p>
								<p className="text-xs text-muted-foreground">
									{new Date(data.best_day.date).toLocaleDateString()}
								</p>
							</>
						) : (
							<p className="text-xs sm:text-sm text-muted-foreground">No data available</p>
						)}
					</div>
				</div>

				<div className="space-y-3 sm:space-y-4">
					{data.languages && data.languages.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-2 sm:mb-3">
								<Code className="h-3 w-3 sm:h-4 sm:w-4" />
								<h3 className="text-sm sm:text-base font-medium">Top Languages</h3>
							</div>
							<div className="space-y-1 sm:space-y-2">
								{data.languages.slice(0, 5).map((lang) => (
									<div
										key={lang.name}
										className="flex items-center justify-between"
									>
										<span className="text-xs sm:text-sm">{lang.name}</span>
										<Badge variant="secondary" className="text-xs">{lang.percent}%</Badge>
									</div>
								))}
							</div>
						</div>
					)}

					{data.projects && data.projects.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-2 sm:mb-3">
								<Folder className="h-3 w-3 sm:h-4 sm:w-4" />
								<h3 className="text-sm sm:text-base font-medium">Top Projects</h3>
							</div>
							<div className="space-y-1 sm:space-y-2">
								{data.projects.slice(0, 5).map((project) => (
									<div
										key={project.name}
										className="flex items-center justify-between"
									>
										<span className="text-xs sm:text-sm truncate">{project.name}</span>
										<Badge variant="outline" className="text-xs">{project.percent}%</Badge>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
