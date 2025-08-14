import { Timer } from "lucide-react";
import { getWakatimeStats, getWakatimeSummaries } from "@/app/tracker/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WakatimeSummariesResponse } from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";

export async function CodingStatsCard() {
	const [languagesResult, summariesResult] = await Promise.all([
		getWakatimeStats("last_7_days"),
		getWakatimeSummaries(),
	]);

	if (!languagesResult.success || !summariesResult.success) {
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

	const languages = languagesResult.data;
	const summaries = summariesResult.data;

	const totalSeconds =
		summaries?.data?.reduce(
			(acc: number, curr: WakatimeSummariesResponse["data"][number]) =>
				acc + curr.grand_total.total_seconds,
			0,
		) ?? 0;

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
					Coding Summary (7d)
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-md border bg-muted/40 p-3">
						<div className="flex items-center gap-2 text-xs text-foreground/70">
							<Timer className="w-3.5 h-3.5" />
							Total time
						</div>
						<div className="mt-1 text-lg font-semibold">
							{formatDuration(totalSeconds)}
						</div>
					</div>
					<div className="rounded-md border bg-muted/40 p-3">
						<div className="flex items-center gap-2 text-xs text-foreground/70">
							<Timer className="w-3.5 h-3.5" />
							Daily avg
						</div>
						<div className="mt-1 text-lg font-semibold">
							{formatDuration(dailyAvgSeconds)}
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<div className="text-xs font-medium text-foreground">
						Top languages
					</div>
					{topLanguages.length === 0 ? (
						<p className="text-xs text-foreground/70">
							No language data available.
						</p>
					) : (
						<div className="space-y-3">
							{topLanguages.map((lang) => (
								<div key={lang.name} className="space-y-1.5">
									<div className="flex items-center justify-between text-xs">
										<span className="font-medium">{lang.name}</span>
										<span className="text-foreground/70">
											{lang.percent.toFixed(1)}%
										</span>
									</div>
									<div className="h-1.5 w-full rounded bg-muted">
										<div
											className="h-full rounded bg-primary"
											style={{
												width: `${Math.max(0, Math.min(100, lang.percent))}%`,
											}}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
