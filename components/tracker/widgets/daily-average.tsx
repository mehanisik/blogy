"use client";

import { TrendingUp } from "lucide-react";
import WakaTimeError from "@/components/tracker/wakatime-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WakatimeSummariesResponse } from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";

interface DailyAverageProps {
	data: WakatimeSummariesResponse | null;
}

export default function DailyAverage({ data: summary }: DailyAverageProps) {
	return (
		<Card className="group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs sm:text-sm font-medium">
					Daily Average (7d)
				</CardTitle>
				<TrendingUp className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				{summary ? (
					<>
						<div className="text-xl font-bold">
							{formatDuration(summary?.daily_average?.seconds || 0)}
						</div>
						<p className="text-xs text-muted-foreground">Per day average</p>
					</>
				) : (
					<WakaTimeError message="No data available" />
				)}
			</CardContent>
		</Card>
	);
}
