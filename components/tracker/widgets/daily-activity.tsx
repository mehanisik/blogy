import { Suspense } from "react";
import DailyActivityChart from "@/components/common/daily-activity-chart";
import WakaTimeError from "@/components/tracker/wakatime-error";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getWakatimeSummaries } from "@/utils/api/wakatime";
import { DailyActivityLoading } from "../loaders";

export default async function DailyActivity() {
	const lastSevenDays = await getWakatimeSummaries();
	const validDays = (lastSevenDays?.data ?? []).map((day) => ({
		date: day.range.date,
		hours: day.grand_total.hours,
		fullDate: day.range.date,
	}));

	const dailyChartData = validDays.map((day) => ({
		date: new Date(day.date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		}),
		hours: day.hours,
		fullDate: day.fullDate,
	}));

	return (
		<Suspense fallback={<DailyActivityLoading />}>
			<Card className="h-full group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
				<CardHeader>
					<CardTitle className="text-base sm:text-lg">
						Daily Activity (7d)
					</CardTitle>
					<CardDescription className="text-xs sm:text-sm">
						Coding hours over the last 7 days
					</CardDescription>
				</CardHeader>
				<CardContent className="h-full flex flex-col overflow-x-auto">
					{lastSevenDays ? (
						<div className="w-full min-w-[250px] mt-auto h-[250px] sm:h-[300px]">
							{dailyChartData.length > 0 ? (
								<DailyActivityChart data={dailyChartData} />
							) : (
								<div className="flex items-center justify-center h-full text-muted-foreground">
									No activity data available
								</div>
							)}
						</div>
					) : (
						<WakaTimeError message="No data available" />
					)}
				</CardContent>
			</Card>
		</Suspense>
	);
}
