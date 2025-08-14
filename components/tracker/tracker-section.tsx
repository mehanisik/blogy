import {
	DailyActivity,
	DailyAverage,
	LanguageDistribution,
	LastSevenDaysStats,
	TopLanguage,
	TotalTime,
} from "@/components/tracker/widgets";

export default async function TrackerSection() {
	return (
		<div className="w-full py-6 min-h-[72vh] px-3 md:px-0">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
				<div className="lg:col-span-3">
					<TotalTime />
				</div>
				<div className="lg:col-span-3">
					<DailyAverage />
				</div>
				<div className="lg:col-span-3">
					<LastSevenDaysStats />
				</div>
				<div className="lg:col-span-3">
					<TopLanguage />
				</div>

				<div className="sm:col-span-2 lg:col-span-8">
					<DailyActivity />
				</div>
				<div className="sm:col-span-2 lg:col-span-4">
					<LanguageDistribution />
				</div>
			</div>
		</div>
	);
}
