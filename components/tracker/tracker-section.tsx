import { Suspense } from "react";
import {
	DailyActivity,
	DailyAverage,
	LanguageDistribution,
	LastSevenDaysStats,
	TopLanguage,
	TotalTime,
} from "@/components/tracker/widgets";
import type {
	WakaTimeAllTimeData,
	WakaTimeLanguageData,
	WakatimeSummariesResponse,
} from "@/types/wakatime";
import {
	fetchWakatimeLanguages,
	fetchWakatimeSummaries,
	fetchWakatimeSummary,
} from "@/utils/api/wakatime";
import {
	DailyActivityLoading,
	DailyAverageLoading,
	LanguageDistributionLoading,
	LastSevenDaysStatsLoading,
	TopLanguageLoading,
	TotalTimeLoading,
} from "../tracker/loaders";

export default async function TrackerSection() {
	// Fetch all data at the server component level
	const summaryPromise = fetchWakatimeSummary();
	const summariesPromise = fetchWakatimeSummaries();
	const languagesPromise = fetchWakatimeLanguages();

	// Use Promise.all to fetch in parallel
	const [summary, summaries, languages] = (await Promise.all([
		summaryPromise,
		summariesPromise,
		languagesPromise,
	])) as [
		WakaTimeAllTimeData,
		WakatimeSummariesResponse,
		WakaTimeLanguageData[],
	];

	return (
		<div className="w-full py-6 min-h-[72vh] px-3 md:px-0">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
				<div className="lg:col-span-3">
					<Suspense fallback={<TotalTimeLoading />}>
						<TotalTime data={summary} />
					</Suspense>
				</div>
				<div className="lg:col-span-3">
					<Suspense fallback={<DailyAverageLoading />}>
						<DailyAverage data={summaries} />
					</Suspense>
				</div>
				<div className="lg:col-span-3">
					<Suspense fallback={<LastSevenDaysStatsLoading />}>
						<LastSevenDaysStats data={summaries} />
					</Suspense>
				</div>
				<div className="lg:col-span-3">
					<Suspense fallback={<TopLanguageLoading />}>
						<TopLanguage data={languages} />
					</Suspense>
				</div>

				<div className="sm:col-span-2 lg:col-span-8">
					<Suspense fallback={<DailyActivityLoading />}>
						<DailyActivity data={summaries} />
					</Suspense>
				</div>
				<div className="sm:col-span-2 lg:col-span-4">
					<Suspense fallback={<LanguageDistributionLoading />}>
						<LanguageDistribution data={languages} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
