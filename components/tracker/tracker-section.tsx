import { Suspense } from "react";
import {
	DailyActivity,
	DailyAverage,
	LanguageDistribution,
	LastSevenDaysStats,
	TopLanguage,
	TotalTime,
} from "@/components/tracker/widgets";

import {
	getWakatimeAllTime,
	getWakatimeStats,
	getWakatimeSummaries,
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
	const [summary, summaries, languages] = await Promise.all([
		getWakatimeAllTime(),
		getWakatimeSummaries(),
		getWakatimeStats(),
	]);

	if (!summary && !summaries && (!languages || languages.length === 0)) {
		return (
			<div className="w-full py-6 min-h-[72vh] px-3 md:px-0">
				<div className="flex items-center justify-center h-full">
					<div className="text-center space-y-4">
						<h2 className="text-2xl font-semibold text-foreground">
							WakaTime Data Unavailable
						</h2>
						<p className="text-foreground/70 max-w-md">
							Unable to load coding activity data. This might be due to missing
							API keys or network issues.
						</p>
					</div>
				</div>
			</div>
		);
	}

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
