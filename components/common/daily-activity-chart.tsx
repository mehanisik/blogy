"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { WakatimeSummariesResponse } from "@/types/wakatime";

interface DailyActivityChartProps {
	data: WakatimeSummariesResponse;
}

export default function DailyActivityChart({ data }: DailyActivityChartProps) {
	if (!data || !data.data || !Array.isArray(data.data)) {
		return (
			<div className="flex items-center justify-center h-full text-muted-foreground">
				<p>No activity data available</p>
			</div>
		);
	}

	const chartData = data.data.map((item) => ({
		date: item.range.date,
		hours: item.grand_total.hours,
		minutes: item.grand_total.minutes,
		totalSeconds: item.grand_total.total_seconds,
		fullDate: item.range.start,
		dayOfWeek: new Date(item.range.start).toLocaleDateString("en-US", {
			weekday: "short",
		}),
		formattedTime: `${item.grand_total.hours}h ${item.grand_total.minutes}m`,
	}));

	const maxHours = Math.max(...chartData.map((item) => item.hours));
	const yAxisMax = Math.ceil(maxHours * 1.2);

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				data={chartData}
				margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
			>
				<CartesianGrid
					strokeDasharray="3 3"
					stroke="var(--border)"
					opacity={0.3}
					vertical={false}
				/>
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					fontSize={12}
					tickFormatter={(value) => {
						const date = new Date(value);
						return date.toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						});
					}}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					fontSize={12}
					domain={[0, yAxisMax]}
					tickFormatter={(value) => `${value}h`}
				/>
				<Tooltip
					content={({ active, payload, label }) => {
						if (active && payload && payload.length) {
							const data = payload[0].payload;
							return (
								<div className="bg-background border rounded-lg p-3 shadow-lg">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<p className="font-semibold text-sm">{data.dayOfWeek}</p>
											<p className="text-xs text-muted-foreground">{label}</p>
										</div>
										<hr className="border-border" />
										<div className="space-y-1">
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Total Time:
												</span>
												<span className="font-medium text-sm">
													{data.formattedTime}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Hours:
												</span>
												<span className="font-medium text-sm">
													{data.hours}h
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Minutes:
												</span>
												<span className="font-medium text-sm">
													{data.minutes}m
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Seconds:
												</span>
												<span className="font-medium text-sm">
													{data.totalSeconds % 60}s
												</span>
											</div>
										</div>
									</div>
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
					className="transition-all duration-200 hover:opacity-80"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
