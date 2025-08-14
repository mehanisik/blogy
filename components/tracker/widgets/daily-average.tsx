import { TrendingUp } from "lucide-react";
import { Suspense } from "react";
import { getWakatimeSummaries } from "@/app/tracker/actions";
import WakaTimeError from "@/components/tracker/wakatime-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "@/utils/helpers";
import { DailyAverageLoading } from "../loaders";

export default async function DailyAverage() {
	const result = await getWakatimeSummaries();

	if (!result.success) {
		return (
			<Card className="group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs sm:text-sm font-medium">
						Daily Average (7d)
					</CardTitle>
					<TrendingUp className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<WakaTimeError message={result.error || "Failed to fetch data"} />
				</CardContent>
			</Card>
		);
	}

	const summary = result.data;

	// Calculate daily average from the summaries data
	const totalSeconds = summary.data.reduce(
		(acc, day) => acc + day.grand_total.total_seconds,
		0,
	);
	const daysCount = summary.data.length;
	const dailyAverageSeconds = daysCount > 0 ? totalSeconds / daysCount : 0;

	return (
		<Suspense fallback={<DailyAverageLoading />}>
			<Card className="group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs sm:text-sm font-medium">
						Daily Average (7d)
					</CardTitle>
					<TrendingUp className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					{summary && summary.data.length > 0 ? (
						<>
							<div className="text-xl font-bold">
								{formatDuration(dailyAverageSeconds)}
							</div>
							<p className="text-xs text-muted-foreground">Per day average</p>
						</>
					) : (
						<WakaTimeError message="No data available" />
					)}
				</CardContent>
			</Card>
		</Suspense>
	);
}
