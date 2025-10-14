import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type {
	WakatimeStatsResponse,
	WakatimeSummariesResponse,
} from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";

interface CodingStatsCardProps {
	languagesResult: WakatimeStatsResponse | null;
	summariesResult: WakatimeSummariesResponse | null;
}

export const CodingStatsCard = ({
	languagesResult,
	summariesResult,
}: CodingStatsCardProps) => {
	if (
		!languagesResult ||
		!summariesResult ||
		!languagesResult.data ||
		!languagesResult.data.languages
	) {
		return (
			<Card className="h-full w-full flex-col border border-dashed border-border">
				<CardHeader>
					<CardTitle className="text-base font-semibold text-foreground">
						Coding Summary (7d)
					</CardTitle>
				</CardHeader>

				<CardContent className="flex-1 space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-1/2" />
						<Skeleton className="h-4 w-1/3" />
					</div>
					<div className="space-y-2 pt-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
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

	const topLanguages = languages
		.slice()
		.sort((a, b) => b.percent - a.percent)
		.slice(0, 3);

	return (
		<Card className="h-full w-full flex-col border border-dashed border-border">
			<CardHeader>
				<CardTitle className="text-base font-semibold text-foreground">
					Coding Summary (7d)
				</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 space-y-4">
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">Total Time</p>
					<p className="text-sm font-semibold">
						{formatDuration(totalSeconds)}
					</p>
				</div>
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">Top Languages</p>
					<div className="flex flex-col space-y-1">
						{topLanguages.map((lang) => (
							<div
								key={lang.name}
								className="flex items-center justify-between text-sm"
							>
								<span className="font-medium">{lang.name}</span>
								<span className="text-muted-foreground">
									{lang.percent.toFixed(1)}%
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
