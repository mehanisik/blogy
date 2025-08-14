import { Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WakatimeSummariesResponse } from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";
import {
	getWakatimeStats,
	getWakatimeSummaries,
} from "@/utils/helpers/wakatime";

export const revalidate = 3600; // 1 hour

export async function CodingStatsCard() {
	const [languagesResult, summariesResult] = await Promise.all([
		getWakatimeStats("last_7_days"),
		getWakatimeSummaries(),
	]);

	if (!languagesResult || !summariesResult) {
		return (
			<Card className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-2 row-span-4 border border-muted hover:border-muted-foreground/20 transition-colors overflow-hidden relative">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Coding Summary (7d)
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-5 w-28" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-5 w-24" />
							</div>
						</div>
						<div className="space-y-3">
							{[0, 1, 2, 3].map((i) => (
								<div key={`lang-skel-${i}`} className="space-y-1.5">
									<div className="flex items-center justify-between text-xs">
										<Skeleton className="h-3 w-20" />
										<Skeleton className="h-3 w-10" />
									</div>
									<Skeleton className="h-1.5 w-full" />
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	const languages = languagesResult.data.languages;
	const summaries = summariesResult;

	const totalSeconds =
		summaries?.data?.reduce(
			(acc: number, curr: WakatimeSummariesResponse["data"][number]) =>
				acc + curr.grand_total.total_seconds,
			0,
		) || 0;

	const daysCount = summaries?.data?.length ?? 0;
	const dailyAvgSeconds = daysCount > 0 ? totalSeconds / daysCount : 0;

	const topLanguages = languages
		.slice()
		.sort((a, b) => b.percent - a.percent)
		.slice(0, 5);

	if (
		!languages ||
		languages.length === 0 ||
		!summaries ||
		!totalSeconds ||
		!dailyAvgSeconds
	) {
		return (
			<Card className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-2 row-span-4 border border-muted hover:border-muted-foreground/20 transition-colors overflow-hidden relative">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Coding Summary (7d)
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-5 w-28" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-5 w-24" />
							</div>
						</div>
						<div className="space-y-3">
							{[0, 1, 2, 3].map((i) => (
								<div key={`lang-skel-${i}`} className="space-y-1.5">
									<div className="flex items-center justify-between text-xs">
										<Skeleton className="h-3 w-20" />
										<Skeleton className="h-3 w-10" />
									</div>
									<Skeleton className="h-1.5 w-full" />
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-2 row-span-4 border border-muted hover:border-muted-foreground/20 transition-colors overflow-hidden relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Timer className="h-4 w-4" />
					Coding Summary (7d)
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-2">
							<p className="text-xs text-foreground/80">Total Time</p>
							<p className="text-lg font-semibold">
								{formatDuration(totalSeconds)}
							</p>
						</div>
						<div className="space-y-2">
							<p className="text-xs text-foreground/80">Daily Average</p>
							<p className="text-lg font-semibold">
								{formatDuration(dailyAvgSeconds)}
							</p>
						</div>
					</div>
					<div className="space-y-3">
						<p className="text-xs text-foreground/80">Top Languages</p>
						{topLanguages.map((lang) => (
							<div key={lang.name} className="space-y-1.5">
								<div className="flex items-center justify-between text-xs">
									<span className="font-medium">{lang.name}</span>
									<span className="text-foreground/70">
										{lang.percent.toFixed(1)}%
									</span>
								</div>
								<div className="w-full bg-muted rounded-full h-1.5">
									<div
										className="bg-primary h-1.5 rounded-full transition-all duration-300"
										style={{ width: `${lang.percent}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
