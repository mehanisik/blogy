"use client";

import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface DailyActivityChartProps {
	data: {
		date: string;
		hours: number;
		fullDate: string;
	}[];
}

export default function DailyActivityChart({ data }: DailyActivityChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 10 }}>
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					fontSize={12}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
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
				<Bar dataKey="hours" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}
