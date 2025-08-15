import type {
	WakatimeStatsResponse,
	WakatimeSummariesResponse,
} from "@/types/wakatime";

export const calculateProductivityMetrics = (
	summaries: WakatimeSummariesResponse,
) => {
	if (!summaries?.data) return null;

	const totalSeconds = summaries.data.reduce(
		(acc, curr) => acc + curr.grand_total.total_seconds,
		0,
	);
	const daysCount = summaries.data.length;
	const activeDays = summaries.data.filter(
		(day) => day.grand_total.total_seconds > 0,
	).length;

	const dailyAvgSeconds = daysCount > 0 ? totalSeconds / daysCount : 0;
	const productivityRate = daysCount > 0 ? (activeDays / daysCount) * 100 : 0;
	const consistencyScore = Math.round(productivityRate);

	let currentStreak = 0;
	let maxStreak = 0;
	for (let i = summaries.data.length - 1; i >= 0; i--) {
		if (summaries.data[i].grand_total.total_seconds > 0) {
			currentStreak++;
			maxStreak = Math.max(maxStreak, currentStreak);
		} else {
			currentStreak = 0;
		}
	}

	return {
		totalSeconds,
		daysCount,
		activeDays,
		dailyAvgSeconds,
		productivityRate,
		consistencyScore,
		currentStreak,
		maxStreak,
	};
};

export const getTopPerformers = (stats: WakatimeStatsResponse) => {
	if (!stats?.data) return null;

	return {
		topLanguages: stats.data.languages
			.slice()
			.sort((a, b) => b.percent - a.percent)
			.slice(0, 6),
		topProjects: stats.data.projects
			.slice()
			.sort((a, b) => b.percent - a.percent)
			.slice(0, 5),
		topEditors: stats.data.editors
			.slice()
			.sort((a, b) => b.percent - a.percent)
			.slice(0, 4),
		topOS: stats.data.operating_systems
			.slice()
			.sort((a, b) => b.percent - a.percent)
			.slice(0, 3),
	};
};

export const getActivityInsights = (summaries: WakatimeSummariesResponse) => {
	if (!summaries?.data) return null;

	const dailyData = summaries.data.map((day) => ({
		date: day.range.date,
		dayOfWeek: new Date(day.range.start).toLocaleDateString("en-US", {
			weekday: "long",
		}),
		shortDay: new Date(day.range.start).toLocaleDateString("en-US", {
			weekday: "short",
		}),
		hours: day.grand_total.hours,
		minutes: day.grand_total.minutes,
		totalSeconds: day.grand_total.total_seconds,
		isActive: day.grand_total.total_seconds > 0,
	}));

	const dayStats = dailyData.reduce(
		(acc, day) => {
			if (!acc[day.dayOfWeek]) {
				acc[day.dayOfWeek] = { totalSeconds: 0, count: 0, activeCount: 0 };
			}
			acc[day.dayOfWeek].totalSeconds += day.totalSeconds;
			acc[day.dayOfWeek].count += 1;
			if (day.isActive) acc[day.dayOfWeek].activeCount += 1;
			return acc;
		},
		{} as Record<
			string,
			{ totalSeconds: number; count: number; activeCount: number }
		>,
	);

	const mostProductiveDay = Object.entries(dayStats).sort(
		([, a], [, b]) => b.totalSeconds - a.totalSeconds,
	)[0];

	return {
		dailyData,
		mostProductiveDay: mostProductiveDay
			? {
					day: mostProductiveDay[0],
					avgSeconds:
						mostProductiveDay[1].totalSeconds / mostProductiveDay[1].count,
				}
			: null,
		dayStats,
	};
};
