import { BarChart3, CalendarDays, Clock } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface StatsCardsProps {
	totalHours: number;
	todayHours: number;
	dailyAvg: number;
}

function formatHours(val: number) {
	if (val >= 10) return Math.round(val);
	return val.toFixed(2);
}

export default function StatsCards({
	totalHours,
	todayHours,
	dailyAvg,
}: StatsCardsProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
				<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				<CardHeader className="relative pb-3">
					<div className="flex items-center justify-center mb-3">
						<div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
							<CalendarDays className="h-6 w-6 text-primary" />
						</div>
					</div>
					<CardTitle className="text-lg font-semibold text-center text-card-foreground">
						Total Hours
					</CardTitle>
					<CardDescription className="text-sm text-center text-muted-foreground">
						All-time coding activity
					</CardDescription>
				</CardHeader>
				<CardContent className="relative pt-0">
					<div className="text-center">
						<div className="text-4xl font-bold text-card-foreground flex items-end justify-center gap-1">
							{formatHours(totalHours)}
							<span className="text-lg font-normal text-muted-foreground">
								h
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
				<div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				<CardHeader className="relative pb-3">
					<div className="flex items-center justify-center mb-3">
						<div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-300">
							<Clock className="h-6 w-6 text-secondary-foreground" />
						</div>
					</div>
					<CardTitle className="text-lg font-semibold text-center text-card-foreground">
						Today
					</CardTitle>
					<CardDescription className="text-sm text-center text-muted-foreground">
						Hours coded today
					</CardDescription>
				</CardHeader>
				<CardContent className="relative pt-0">
					<div className="text-center">
						<div className="text-4xl font-bold text-card-foreground flex items-end justify-center gap-1">
							{todayHours.toFixed(2)}
							<span className="text-lg font-normal text-muted-foreground">
								h
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
				<div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				<CardHeader className="relative pb-3">
					<div className="flex items-center justify-center mb-3">
						<div className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
							<BarChart3 className="h-6 w-6 text-accent-foreground" />
						</div>
					</div>
					<CardTitle className="text-lg font-semibold text-center text-card-foreground">
						Daily Average
					</CardTitle>
					<CardDescription className="text-sm text-center text-muted-foreground">
						Last 7 days
					</CardDescription>
				</CardHeader>
				<CardContent className="relative pt-0">
					<div className="text-center">
						<div className="text-4xl font-bold text-card-foreground flex items-end justify-center gap-1">
							{dailyAvg.toFixed(2)}
							<span className="text-lg font-normal text-muted-foreground">
								h
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
