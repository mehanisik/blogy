"use client";

import { Cell, Pie, PieChart } from "recharts";
import type { ChartData } from "recharts/types/state/chartDataSlice";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartPieSimpleProps {
	data: ChartData[];
	config: ChartConfig;
	title: string;
	description: string;
	dataKey?: string;
	nameKey?: string;
}

export function ChartPieSimple({
	data,
	config,
	dataKey = "visitors",
	nameKey = "browser",
}: ChartPieSimpleProps) {
	return (
		<ChartContainer
			config={config}
			className="mx-auto aspect-square max-h-[250px]"
		>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie data={data} dataKey={dataKey} nameKey={nameKey}>
					{data.map((entry) => {
						const entryName = entry[nameKey as keyof typeof entry] as string;
						return (
							<Cell key={`cell-${entryName}`} fill={config[entryName]?.color} />
						);
					})}
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
