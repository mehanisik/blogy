import type { ChartData } from "recharts/types/state/chartDataSlice";
import { ChartPieSimple } from "@/components/charts/pie";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import type { WakaTimeLanguageData } from "@/types/wakatime";

interface TopLanguagesPieProps {
	data: WakaTimeLanguageData[];
}

const PIE_COLORS = [
	"#3366f1",
	"#6b5cf6",
	"#f855f7",
	"#f536zf",
	"#f59e0b",
	"#f87171",
	"#f97316",
];

export default function TopLanguagesPie({ data }: TopLanguagesPieProps) {
	const processedData = data
		.slice(0, 8)
		.map((lang: WakaTimeLanguageData, i: number) => {
			const hours = Math.floor(lang.total_seconds / 3600);
			const minutes = Math.floor((lang.total_seconds % 3600) / 60);
			const percent = lang.percent?.toFixed(2) ?? "0.00";
			return {
				name: lang.name,
				value: lang.total_seconds,
				hours,
				minutes,
				percent,
				percentValue: parseFloat(percent),
				color: PIE_COLORS[i % PIE_COLORS.length],
			};
		});

	const chartData = processedData.map((l) => ({
		language: l.name,
		percentage: l.percentValue,
	}));

	const pieConfig = chartData.reduce((acc, item) => {
		const langData = processedData.find((l) => l.name === item.language);
		acc[item.language] = {
			label: item.language,
			color: langData?.color || "#6366f1",
		};
		return acc;
	}, {} as ChartConfig);

	return (
		<Card className="group relative overflow-hidden border p-6  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex flex-col">
					<CardHeader className="pb-4 px-0">
						<CardTitle className="text-xl">Languages</CardTitle>
						<CardDescription>Top languages by coding time</CardDescription>
					</CardHeader>
					<div className="flex-1">
						<ChartPieSimple
							data={chartData as unknown as ChartData[]}
							config={pieConfig}
							title="Languages"
							description="Top languages by coding time"
							dataKey="percentage"
							nameKey="language"
						/>
					</div>
				</div>

				<div className="flex flex-col">
					<CardHeader className="pb-4 px-0">
						<CardTitle className="text-xl">Language Breakdown</CardTitle>
						<CardDescription>
							Detailed time spent on each language
						</CardDescription>
					</CardHeader>
					<div className="flex-1">
						<div className="flex flex-col gap-4">
							{processedData.map((lang) => (
								<div
									key={lang.name}
									className="flex items-center gap-3 text-sm"
								>
									<span
										className="inline-block w-3 h-3 rounded-full"
										style={{ backgroundColor: lang.color }}
									/>
									<div className="flex justify-between w-full">
										<span className="font-medium">{lang.name}</span>
										<span className="text-muted-foreground">
											{lang.hours}h {lang.minutes}m ({lang.percent}%)
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
