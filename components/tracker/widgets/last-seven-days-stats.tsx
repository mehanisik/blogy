import { Calendar } from "lucide-react";
import { getWakatimeSummaries } from "@/app/tracker/actions";
import WakaTimeError from "@/components/tracker/wakatime-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "@/utils/helpers";

export default async function LastSevenDaysStats() {
	const result = await getWakatimeSummaries();

	if (!result.success) {
		return (
			<Card className="group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs sm:text-sm font-medium">
						Last 7 Days Total
					</CardTitle>
					<Calendar className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<WakaTimeError message={result.error || "Failed to fetch data"} />
				</CardContent>
			</Card>
		);
	}

	const lastSevenDays = result.data;
	const lastSevenDaysTotalSeconds = (lastSevenDays?.data ?? []).reduce(
		(total, day) => total + (day.grand_total.total_seconds || 0),
		0,
	);

	// Calculate daily average from the data
	const daysCount = lastSevenDays.data.length;
	const lastSevenDaysDailyAverageSeconds =
		daysCount > 0 ? lastSevenDaysTotalSeconds / daysCount : 0;

	return (
		<Card className="group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs sm:text-sm font-medium">
					Last 7 Days Total
				</CardTitle>
				<Calendar className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				{lastSevenDays && lastSevenDays.data.length > 0 ? (
					<>
						<div className="text-xl font-bold">
							{formatDuration(lastSevenDaysTotalSeconds)}
						</div>
						<p className="text-xs text-muted-foreground">
							{formatDuration(lastSevenDaysDailyAverageSeconds)}&nbsp;daily avg
						</p>
					</>
				) : (
					<WakaTimeError message="No data available" />
				)}
			</CardContent>
		</Card>
	);
}
