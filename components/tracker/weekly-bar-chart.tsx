import type { ChartData } from "recharts/types/state/chartDataSlice";
import { ChartBarLabel } from "@/components/charts/bar";

interface WeeklyBarChartProps {
	data: { day: string; hours: number }[];
}

export default function WeeklyBarChart({ data }: WeeklyBarChartProps) {
	return (
		<ChartBarLabel
			description="Coding hours for each day of the week in the last 7 days"
			data={
				data.map((d) => ({
					month: d.day,
					desktop: d.hours,
				})) as unknown as ChartData[]
			}
			config={{ desktop: { label: "Hours", color: "#6366f1" } }}
			title="Weekly Coding"
		/>
	);
}
