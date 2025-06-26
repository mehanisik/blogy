"use client";

import { TrendingUp } from "lucide-react";
import type { ChartData } from "recharts/types/state/chartDataSlice";
import { ChartRadialStacked } from "@/components/charts/radial-stacked";
import type { ChartConfig } from "@/components/ui/chart";

interface DailyGoalRadialProps {
	hours: number;
}

const DAILY_GOAL = 3; // 3 hours of coding

export default function DailyGoalRadial({ hours }: DailyGoalRadialProps) {
	const percentage = Math.min(Math.round((hours / DAILY_GOAL) * 100), 100);

	const chartData = [
		{
			desktop: percentage,
			mobile: 100 - percentage,
		},
	];

	const chartConfig: ChartConfig = {
		desktop: {
			label: "Completed",
			color: "#6366f1",
		},
		mobile: {
			label: "Remaining",
			color: "#e5e7eb",
		},
	};

	return (
		<ChartRadialStacked
			chartData={chartData as unknown as ChartData[]}
			chartConfig={chartConfig}
			footerInfo={{
				label: `${percentage}%`,
				icon: <TrendingUp className="h-4 w-4" />,
				description: `I coded ${hours.toFixed(1)}h today. My goal is at least ${DAILY_GOAL}h.`,
			}}
			title="Daily Goal"
			label={`${percentage}% of goal`}
			description="My daily coding goal progress"
		/>
	);
}
