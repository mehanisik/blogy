import { Suspense } from "react";
import { getWakatimeStats } from "@/app/tracker/actions";
import { DistributionChart } from "@/components/common/distribution-chart";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { WakaTimeLanguageData } from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";
import { LanguageDistributionLoading } from "../loaders";

const COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export default async function LanguageDistribution() {
	const languages = await getWakatimeStats("last_7_days");
	const languagesArray: WakaTimeLanguageData[] = languages.success
		? languages.data
		: [];
	const topLanguages = [...languagesArray]
		.sort((a, b) => b.percent - a.percent)
		.slice(0, 6);

	const languageChartData = topLanguages.map((lang) => ({
		name: lang.name,
		percent: lang.percent,
		total_seconds: lang.total_seconds,
	}));

	return (
		<Suspense fallback={<LanguageDistributionLoading />}>
			<Card className="h-full group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
				<CardHeader>
					<CardTitle className="text-base sm:text-lg">
						Language Distribution (7d)
					</CardTitle>
					<CardDescription className="text-xs sm:text-sm">
						Top programming languages used in the last 7 days
					</CardDescription>
				</CardHeader>
				<CardContent className="overflow-x-auto">
					<div className="w-full min-w-[250px]">
						{languageChartData.length > 0 ? (
							<>
								<div className="w-full h-[250px] sm:h-[300px]">
									<DistributionChart colors={COLORS} data={languageChartData} />
								</div>
								<div className="space-y-2 w-full max-w-xs mx-auto mt-4">
									{topLanguages.map((lang, index) => (
										<div
											key={lang.name}
											className="flex items-center justify-between"
										>
											<div className="flex items-center gap-2">
												<div
													className="w-3 h-3 rounded-full"
													style={{
														backgroundColor: COLORS[index % COLORS.length],
													}}
												/>
												<span className="text-xs sm:text-sm font-medium">
													{lang.name}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Badge variant="secondary" className="text-xs">
													{lang.percent != null
														? lang.percent.toFixed(1)
														: "N/A"}
													%
												</Badge>
												<span className="text-xs text-muted-foreground">
													{formatDuration(lang.total_seconds || 0)}
												</span>
											</div>
										</div>
									))}
								</div>
							</>
						) : (
							<div className="flex items-center justify-center h-[250px] sm:h-[300px] text-muted-foreground">
								No language data available
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</Suspense>
	);
}
