"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
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

const COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

interface LanguageDistributionProps {
	data: WakaTimeLanguageData[];
}

export default function LanguageDistribution({
	data: languages,
}: LanguageDistributionProps) {
	const languagesArray: WakaTimeLanguageData[] = languages ?? [];
	const topLanguages = [...languagesArray]
		.sort((a, b) => b.percent - a.percent)
		.slice(0, 6);

	const languageChartData = topLanguages.map((lang) => ({
		name: lang.name,
		percent: lang.percent,
		total_seconds: lang.total_seconds,
	}));

	return (
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
								<ResponsiveContainer width={"100%"} height={"100%"}>
									<PieChart>
										<Pie
											data={languageChartData}
											cx="50%"
											cy="50%"
											innerRadius={40}
											outerRadius={80}
											dataKey="percent"
										>
											{languageChartData.map((entry, index) => (
												<Cell
													key={entry.name}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											content={({ active, payload }) => {
												if (active && payload && payload.length) {
													const data = payload[0]
														.payload as WakaTimeLanguageData & {
														percent?: number;
														total_seconds?: number;
													};
													return (
														<div className="bg-background border rounded-lg p-2 shadow-md">
															<p className="font-medium">{data.name}</p>
															<p className="text-sm text-muted-foreground">
																{data.percent != null
																	? data.percent.toFixed(1)
																	: "N/A"}
																% • {formatDuration(data.total_seconds || 0)}
															</p>
														</div>
													);
												}
												return null;
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
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
												{lang.percent != null ? lang.percent.toFixed(1) : "N/A"}
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
	);
}
