"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { WakaTimeLanguageData } from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";

interface DistributionChartProps {
	data: {
		name: string;
		percent: number;
		total_seconds: number;
	}[];
	colors: string[];
}

export const DistributionChart = ({ data, colors }: DistributionChartProps) => {
	return (
		<ResponsiveContainer width={"100%"} height={"100%"}>
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={40}
					outerRadius={80}
					dataKey="percent"
				>
					{data.map((entry, index) => (
						<Cell key={entry.name} fill={colors[index % colors.length]} />
					))}
				</Pie>
				<Tooltip
					content={({ active, payload }) => {
						if (active && payload && payload.length) {
							const data = payload[0].payload as WakaTimeLanguageData & {
								percent?: number;
								total_seconds?: number;
							};
							return (
								<div className="bg-background border rounded-lg p-2 shadow-md">
									<p className="font-medium">{data.name}</p>
									<p className="text-sm text-muted-foreground">
										{data.percent != null ? data.percent.toFixed(1) : "N/A"}% •{" "}
										{formatDuration(data.total_seconds || 0)}
									</p>
								</div>
							);
						}
						return null;
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};
