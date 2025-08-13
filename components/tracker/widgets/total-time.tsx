"use client";

import { Clock } from "lucide-react";
import WakaTimeError from "@/components/tracker/wakatime-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WakaTimeAllTimeData } from "@/types/wakatime";
import { formatDuration } from "@/utils/helpers";

interface TotalTimeProps {
	data: WakaTimeAllTimeData;
}

export default function TotalTime({ data: summary }: TotalTimeProps) {
	return (
		<Card className="group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs sm:text-sm font-medium">
					All-Time Total
				</CardTitle>
				<Clock className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				{summary ? (
					<>
						<div className="text-xl font-bold break-words">
							{formatDuration(summary?.total_seconds || 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							Since{" "}
							{summary?.range?.start_date
								? new Date(summary.range.start_date).toLocaleDateString()
								: "N/A"}
						</p>
					</>
				) : (
					<WakaTimeError message="No data available" />
				)}
			</CardContent>
		</Card>
	);
}
