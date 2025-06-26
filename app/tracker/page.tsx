import { Suspense } from "react";
import { PageLayout } from "@/components/page-layout";
import DailyGoalRadial from "@/components/tracker/daily-goal-radial";
import StatsCards from "@/components/tracker/stats-cards";
import TopLanguagesPie from "@/components/tracker/top-languages-pie";
import WeeklyBarChart from "@/components/tracker/weekly-bar-chart";
import {
	getWakaTimeLanguages,
	getWakaTimeLastSevenDays,
	getWakaTimeSummary,
} from "./actions";
import TrackerLoading from "./loading";

export default async function TrackerPage() {
	const [allTime, stats, languages] = await Promise.all([
		getWakaTimeSummary(),
		getWakaTimeLastSevenDays(),
		getWakaTimeLanguages(),
	]);

	const totalHours = allTime.total_seconds
		? Math.round(allTime.total_seconds / 3600)
		: 0;
	const todayHours = stats.days[stats.days.length - 1]?.hours ?? 0;
	const dailyAvg = stats.daily_average ?? 0;

	const weeklyData = (stats.days ?? []).map((d) => ({
		day: new Date(`${d.date}T00:00:00`).toLocaleDateString("en-US", {
			weekday: "short",
		}),
		hours: d.hours,
	}));

	return (
		<Suspense fallback={<TrackerLoading />}>
			<PageLayout>
				<header className="mb-8 sm:mb-12">
					<h1 className="text-3xl font-light tracking-tight text-foreground mb-3">
						Activity Tracker
					</h1>
					<p className="text-lg text-muted-foreground">
						I use WakaTime to track my coding activity with VSCode extension to
						see how much time I spend on each project so that I can track my
						progress and organize my time better.
					</p>
				</header>

				<StatsCards
					totalHours={totalHours}
					todayHours={todayHours}
					dailyAvg={dailyAvg}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
					<div className="lg:col-span-2 overflow-x-auto">
						<WeeklyBarChart data={weeklyData} />
					</div>

					<div className="lg:col-span-1">
						<DailyGoalRadial hours={todayHours} />
					</div>
				</div>

				<div className="w-full mt-8">
					<TopLanguagesPie data={languages ?? []} />
				</div>
			</PageLayout>
		</Suspense>
	);
}
