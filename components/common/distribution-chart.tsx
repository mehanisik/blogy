"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import type { WakatimeStatsResponse } from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";

interface DistributionChartProps {
	data: WakatimeStatsResponse;
	colors: string[];
}

export default function DistributionChart({
	data,
	colors,
}: DistributionChartProps) {
	if (!data || !data.data || !Array.isArray(data.data.languages)) {
		return (
			<div className="flex items-center justify-center h-full text-muted-foreground">
				No data available
			</div>
		);
	}

	const chartData = data.data.languages.slice(0, 3);

	return (
		<ResponsiveContainer width={"100%"} height={"100%"}>
			<PieChart>
				<Pie
					data={chartData}
					cx="50%"
					cy="45%"
					innerRadius={35}
					outerRadius={70}
					dataKey="percent"
					paddingAngle={2}
					stroke="var(--border)"
					strokeWidth={1}
				>
					{chartData.map((entry, index) => (
						<Cell
							key={entry.name}
							fill={colors[index % colors.length]}
							className="transition-all duration-200 hover:opacity-80"
						/>
					))}
				</Pie>
				<Tooltip
					content={({ active, payload }) => {
						if (active && payload && payload.length) {
							const data = payload[0]
								.payload as WakatimeStatsResponse["data"]["languages"][number];
							return (
								<div className="bg-background border rounded-lg p-3 shadow-lg">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<p className="font-semibold text-sm">{data.name}</p>
											<Badge className="text-xs">
												{data.percent.toFixed(1)}%
											</Badge>
										</div>
										<hr className="border-border" />
										<div className="space-y-1">
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Total Time:
												</span>
												<span className="font-medium text-sm">
													{formatDuration(data.total_seconds)}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													Percentage:
												</span>
												<span className="font-medium text-sm">
													{data.percent.toFixed(1)}%
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
				<Legend
					verticalAlign="bottom"
					height={36}
					formatter={(value, _, index) => (
						<div className="flex items-center gap-2">
							<div
								className="w-2 h-2 rounded-full"
								style={{ backgroundColor: colors[index % colors.length] }}
							/>
							<span className="text-xs text-muted-foreground">{value}</span>
						</div>
					)}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}

function Badge({
	className,
	children,
}: {
	className: string;
	children: React.ReactNode;
}) {
	return (
		<span
			className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${className}`}
		>
			{children}
		</span>
	);
}
