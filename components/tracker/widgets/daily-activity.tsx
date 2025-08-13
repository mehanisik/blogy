"use client";

import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import WakaTimeError from "@/components/tracker/wakatime-error";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { WakatimeSummariesResponse } from "@/types/wakatime";

interface DailyActivityProps {
	data: WakatimeSummariesResponse;
}

export default function DailyActivity({
	data: lastSevenDays,
}: DailyActivityProps) {
	const validDays = (lastSevenDays?.data ?? []).map((day) => ({
		date: day.range.date,
		hours: day.grand_total.hours,
		fullDate: day.range.date,
	}));

	const dailyChartData = validDays.map((day) => ({
		date: new Date(day.date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		}),
		hours: day.hours,
		fullDate: day.fullDate,
	}));

	return (
		<Card className="h-full group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
			<CardHeader>
				<CardTitle className="text-base sm:text-lg">
					Daily Activity (7d)
				</CardTitle>
				<CardDescription className="text-xs sm:text-sm">
					Coding hours over the last 7 days
				</CardDescription>
			</CardHeader>
			<CardContent className="h-full flex flex-col overflow-x-auto">
				{lastSevenDays ? (
					<div className="w-full min-w-[250px] mt-auto h-[250px] sm:h-[300px]">
						{dailyChartData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={dailyChartData}
									margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
								>
									<XAxis
										dataKey="date"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										fontSize={12}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										fontSize={12}
									/>
									<Tooltip
										content={({ active, payload, label }) => {
											if (active && payload && payload.length) {
												return (
													<div className="bg-background border rounded-lg p-2 shadow-md">
														<p className="font-medium">{label}</p>
														<p className="text-sm text-muted-foreground">
															{payload[0].value || 0} hours
														</p>
													</div>
												);
											}
											return null;
										}}
										cursor={false}
									/>
									<Bar
										dataKey="hours"
										fill="var(--chart-1)"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-full text-muted-foreground">
								No activity data available
							</div>
						)}
					</div>
				) : (
					<WakaTimeError message="No data available" />
				)}
			</CardContent>
		</Card>
	);
}
