import { Calendar, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { WakaTimeStats } from "@/types/wakatime";

interface WeeklyActivityProps {
	stats: WakaTimeStats;
}

export function WeeklyActivity({ stats }: WeeklyActivityProps) {
	const data = stats.data;

	const getLast7Days = () => {
		const days = [];
		const today = new Date();

		for (let i = 6; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			days.push(date);
		}

		return days;
	};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
	};

	const getDayName = (date: Date) => {
		return date.toLocaleDateString("en-US", { weekday: "short" });
	};

	const getDayDate = (date: Date) => {
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	const getActivityLevel = (seconds: number) => {
		if (seconds === 0) return "none";
		if (seconds < 1800) return "low";
		if (seconds < 7200) return "medium";
		return "high";
	};

	const days = getLast7Days();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
					<h2 className="text-lg sm:text-xl font-semibold">Weekly Activity</h2>
				</div>
				<p className="text-xs sm:text-sm text-muted-foreground">
					Coding activity over the last 7 days
				</p>
			</CardHeader>
			<CardContent>
				<div className="space-y-3 sm:space-y-4">
					<div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
						<div className="text-center">
							<p className="text-lg sm:text-2xl font-bold text-primary">
								{data.human_readable_total ||
									formatTime(data.total_seconds || 0)}
							</p>
							<p className="text-xs text-muted-foreground">Total Time</p>
						</div>
						<div className="text-center">
							<p className="text-lg sm:text-2xl font-bold text-primary">
								{data.human_readable_daily_average ||
									formatTime(data.daily_average_including_other_language || 0)}
							</p>
							<p className="text-xs text-muted-foreground">Daily Average</p>
						</div>
						<div className="text-center">
							<p className="text-lg sm:text-2xl font-bold text-primary">
								{data.days_minus_holidays || 0}
							</p>
							<p className="text-xs text-muted-foreground">Active Days</p>
						</div>
					</div>

					<div className="space-y-2 sm:space-y-3">
						<h3 className="font-medium text-xs sm:text-sm">Daily Breakdown</h3>
						<div className="grid grid-cols-7 gap-1 sm:gap-2">
							{days.map((day) => {
								const dayName = getDayName(day);
								const dayDate = getDayDate(day);
								const isCurrentDay = isToday(day);

								const daySeconds = isCurrentDay
									? (data.total_seconds || 0) / 7
									: 0;
								const activityLevel = getActivityLevel(daySeconds);

								return (
									<div
										key={crypto.randomUUID()}
										className={`relative p-2 sm:p-3 rounded-lg border text-center transition-all ${
											isCurrentDay
												? "border-primary bg-primary/5"
												: "border-border bg-card"
										}`}
									>
										<div className="space-y-1 sm:space-y-2">
											<p
												className={`text-xs font-medium ${
													isCurrentDay
														? "text-primary"
														: "text-muted-foreground"
												}`}
											>
												{dayName}
											</p>
											<p className="text-xs text-muted-foreground">{dayDate}</p>

											<div className="flex justify-center">
												<div
													className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
														activityLevel === "none"
															? "bg-muted"
															: activityLevel === "low"
																? "bg-yellow-500"
																: activityLevel === "medium"
																	? "bg-orange-500"
																	: "bg-green-500"
													}`}
												/>
											</div>

											{daySeconds > 0 && (
												<p className="text-xs font-medium">
													{formatTime(daySeconds)}
												</p>
											)}
										</div>

										{isCurrentDay && (
											<Badge
												variant="secondary"
												className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-xs"
											>
												Today
											</Badge>
										)}
									</div>
								);
							})}
						</div>
					</div>

					{data.best_day && (
						<div className="p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
							<div className="flex items-center gap-2 mb-2">
								<TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
								<h4 className="font-medium text-xs sm:text-sm">Best Day</h4>
							</div>
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
								<div>
									<p className="text-sm sm:text-lg font-semibold">{data.best_day.text}</p>
									<p className="text-xs sm:text-sm text-muted-foreground">
										{new Date(data.best_day.date).toLocaleDateString("en-US", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
								</div>
								<Badge variant="outline" className="text-xs w-fit">
									{Math.round(
										(data.best_day.total_seconds / (data.total_seconds || 1)) *
											100,
									)}
									% of week
								</Badge>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
