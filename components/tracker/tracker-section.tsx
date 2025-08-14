import {
	BarChart3,
	Calendar,
	Clock,
	Code,
	PieChart,
	Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatDuration } from "@/utils/helpers";
import {
	calculateProductivityMetrics,
	getTopPerformers,
	getWakatimeStats,
	getWakatimeSummaries,
} from "@/utils/helpers/wakatime";
import DailyActivityChart from "../common/daily-activity-chart";
import DistributionChart from "../common/distribution-chart";
import { TrackerSkeleton } from "./tracker-skeletons";

export const revalidate = 3600; // 1 hour

export default async function TrackerSection() {
	const [wakatimeStats, wakatimeSummaries] = await Promise.all([
		getWakatimeStats("last_7_days"),
		getWakatimeSummaries("last_7_days"),
	]);

	if (!wakatimeStats || !wakatimeSummaries) {
		return <TrackerSkeleton />;
	}

	const metrics = calculateProductivityMetrics(wakatimeSummaries);
	const topPerformers = getTopPerformers(wakatimeStats);

	if (!metrics || !topPerformers) {
		return <TrackerSkeleton />;
	}

	const totalHours = Math.floor(metrics.totalSeconds / 3600);
	const totalMinutes = Math.floor((metrics.totalSeconds % 3600) / 60);
	const dailyAvgHours = Math.floor(metrics.dailyAvgSeconds / 3600);
	const dailyAvgMinutes = Math.floor((metrics.dailyAvgSeconds % 3600) / 60);

	const colors = [
		"var(--chart-1)",
		"var(--chart-2)",
		"var(--chart-3)",
		"var(--chart-4)",
		"var(--chart-5)",
	];

	const mostUsedLanguage = topPerformers.topLanguages[0];

	return (
		<div className="w-full py-6 min-h-[72vh] px-3 md:px-0">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
				<div className="lg:col-span-3">
					<Card className="h-full border border-muted hover:border-muted-foreground/20 transition-colors">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<Clock className="h-4 w-4" />
								Total Time (7d)
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">
								{totalHours}h {totalMinutes}m
							</p>
							<p className="text-xs text-foreground/80 mt-1">
								{metrics.daysCount} days tracked •{" "}
								{formatDuration(metrics.totalSeconds)}
							</p>
							<Separator className="my-3" />
							<div className="flex items-center gap-2 text-xs text-foreground/80">
								<Code className="h-3 w-3" />
								{metrics.activeDays} active days
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-3">
					<Card className="h-full border border-muted hover:border-muted-foreground/20 transition-colors">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<BarChart3 className="h-4 w-4" />
								Daily Average
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">
								{dailyAvgHours}h {dailyAvgMinutes}m
							</p>
							<p className="text-xs text-foreground/80 mt-1">
								per day • {formatDuration(metrics.dailyAvgSeconds)}
							</p>
							<Separator className="my-3" />
							<div className="flex items-center gap-2 text-xs text-foreground/80">
								<BarChart3 className="h-3 w-3" />
								{metrics.consistencyScore}% consistency
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-3">
					<Card className="h-full border border-muted hover:border-muted-foreground/20 transition-colors">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<Trophy className="h-4 w-4" />
								Best Day
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">
								{wakatimeStats.data.best_day
									? formatDuration(wakatimeStats.data.best_day.total_seconds)
									: "N/A"}
							</p>
							<p className="text-xs text-foreground/80 mt-1">
								{wakatimeStats.data.best_day?.date || "No data"}
							</p>
							<Separator className="my-3" />
							<div className="flex items-center gap-2 text-xs text-foreground/80">
								<Calendar className="h-3 w-3" />
								{wakatimeStats.data.best_day
									? new Date(
											wakatimeStats.data.best_day.date,
										).toLocaleDateString("en-US", { weekday: "short" })
									: "N/A"}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-3">
					<Card className="h-full border border-muted hover:border-muted-foreground/20 transition-colors">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<Code className="h-4 w-4" />
								Most Used Language
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">
								{mostUsedLanguage?.name || "N/A"}
							</p>
							<p className="text-xs text-foreground/80 mt-1">
								{mostUsedLanguage
									? `${mostUsedLanguage.percent.toFixed(1)}% of total time`
									: "No data"}
							</p>
							<Separator className="my-3" />
							<div className="flex items-center gap-2 text-xs text-foreground/80">
								<PieChart className="h-3 w-3" />
								{mostUsedLanguage
									? formatDuration(mostUsedLanguage.total_seconds)
									: "N/A"}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="sm:col-span-2 lg:col-span-8">
					<Card className="h-full border border-muted hover:border-muted-foreground/20 transition-colors">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<BarChart3 className="h-4 w-4" />
								Daily Activity
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[350px]">
							<DailyActivityChart data={wakatimeSummaries} />
						</CardContent>
					</Card>
				</div>

				<div className="sm:col-span-2 lg:col-span-4">
					<Card className="h-full border border-muted hover:border-muted-foreground/20 transition-colors">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-sm font-medium">
								<PieChart className="h-4 w-4" />
								Top Languages
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[350px]">
							<DistributionChart data={wakatimeStats} colors={colors} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
