"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import type { ChartData } from "recharts/types/state/chartDataSlice";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartRadialStackedProps {
	chartData: ChartData[];
	chartConfig: ChartConfig;
	footerInfo: {
		label: string;
		icon: React.ReactNode;
		description: string;
	};
	title: string;
	label: string;
	description: string;
}

export function ChartRadialStacked({
	chartData,
	chartConfig,
	footerInfo,
	title,
	label,
	description,
}: ChartRadialStackedProps) {
	return (
		<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
			<CardHeader className="items-center pb-0">
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-1 items-center pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square w-full max-w-[250px]"
				>
					<RadialBarChart
						data={chartData}
						endAngle={180}
						innerRadius={80}
						outerRadius={130}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className="fill-foreground text-2xl font-bold"
												></tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className="fill-muted-foreground"
												>
													{label}
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="desktop"
							stackId="a"
							cornerRadius={5}
							fill="var(--color-desktop)"
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="mobile"
							fill="var(--color-mobile)"
							stackId="a"
							cornerRadius={5}
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 leading-none font-medium">
					{footerInfo.label} <TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">
					{footerInfo.description}
				</div>
			</CardFooter>
		</Card>
	);
}
