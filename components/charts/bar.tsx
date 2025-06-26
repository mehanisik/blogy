"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import type { ChartData } from "recharts/types/state/chartDataSlice";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { getWeekdayAbbr } from "@/utils/date";

interface ChartBarLabelProps {
	data: ChartData[];
	config: ChartConfig;
	title: string;
	description: string;
}

export function ChartBarLabel({
	data,
	config,
	title,
	description,
}: ChartBarLabelProps) {
	return (
		<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config}>
					<BarChart
						accessibilityLayer
						data={data}
						margin={{
							top: 20,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => getWeekdayAbbr(value)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
