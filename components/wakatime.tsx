"use client";

import { Calendar, Clock, Code, TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type ActionResponse, ResponseStatus } from "@/types/actions";
import type {
	WakaTimeAllTimeData,
	WakaTimeLanguageData,
	WakaTimeLastSevenDaysData,
} from "@/types/wakatime";
import { formatDuration } from "@/utils/date";

const COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export default function WakaTimeDashboard({
	summaryResult,
	languagesResult,
	lastSevenDaysResult,
}: {
	summaryResult: ActionResponse<WakaTimeAllTimeData>;
	languagesResult: ActionResponse<WakaTimeLanguageData[]>;
	lastSevenDaysResult: ActionResponse<WakaTimeLastSevenDaysData>;
}) {
	if (summaryResult.status === ResponseStatus.ERROR) {
		return (
			<Alert className="max-w-4xl mx-auto mt-8">
				<AlertDescription>
					Failed to load WakaTime summary: {summaryResult.message}
				</AlertDescription>
			</Alert>
		);
	}

	if (languagesResult.status === ResponseStatus.ERROR) {
		return (
			<Alert className="max-w-4xl mx-auto mt-8">
				<AlertDescription>
					Failed to load WakaTime languages: {languagesResult.message}
				</AlertDescription>
			</Alert>
		);
	}

	if (lastSevenDaysResult.status === ResponseStatus.ERROR) {
		return (
			<Alert className="max-w-4xl mx-auto mt-8">
				<AlertDescription>
					Failed to load WakaTime activity: {lastSevenDaysResult.message}
				</AlertDescription>
			</Alert>
		);
	}

	const summary = summaryResult.data;
	const languages = languagesResult.data?.slice(0, 5) || [];
	const lastSevenDays = lastSevenDaysResult.data;

	if (!summary || !lastSevenDays) {
		return (
			<Alert className="max-w-4xl mx-auto mt-8">
				<AlertDescription>
					No data available. Please try again later.
				</AlertDescription>
			</Alert>
		);
	}

	const validLanguages = languages.filter(
		(lang) =>
			lang &&
			typeof lang === "object" &&
			lang.name &&
			typeof lang.percent === "number" &&
			typeof lang.total_seconds === "number",
	);

	const languageChartData = validLanguages.map((lang, index) => ({
		...lang,
		fill: COLORS[index % COLORS.length],
	}));

	const validDays =
		lastSevenDays.days?.filter(
			(day) =>
				day &&
				typeof day === "object" &&
				day.date &&
				typeof day.hours === "number",
		) || [];

	const dailyChartData = validDays.map((day) => ({
		date: new Date(day.date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		}),
		hours: day.hours,
		fullDate: day.date,
	}));

	return (
		<div className="w-full max-w-full space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					{" "}
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Total Time
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl sm:text-2xl font-bold break-words">
							{summary.text || "N/A"}
						</div>
						<p className="text-xs text-muted-foreground">
							Since{" "}
							{summary.range?.start_date
								? new Date(summary.range.start_date).toLocaleDateString()
								: "N/A"}
						</p>
					</CardContent>
				</Card>

				<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					{" "}
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Daily Average
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl sm:text-2xl font-bold">
							{formatDuration(summary.daily_average || 0)}
						</div>
						<p className="text-xs text-muted-foreground">Per day average</p>
					</CardContent>
				</Card>

				<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					{" "}
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Last 7 Days
						</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl sm:text-2xl font-bold">
							{formatDuration(lastSevenDays.total_seconds || 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							{formatDuration(lastSevenDays.daily_average || 0)} daily avg
						</p>
					</CardContent>
				</Card>

				<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					{" "}
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Top Language
						</CardTitle>
						<Code className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl sm:text-2xl font-bold">
							{validLanguages[0]?.name || "N/A"}
						</div>
						<p className="text-xs text-muted-foreground">
							{validLanguages[0]?.percent != null
								? validLanguages[0].percent.toFixed(1)
								: "N/A"}
							% of time
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					{" "}
					<CardHeader>
						<CardTitle className="text-base sm:text-lg">
							Daily Activity
						</CardTitle>
						<CardDescription className="text-xs sm:text-sm">
							Coding hours over the last 7 days
						</CardDescription>
					</CardHeader>
					<CardContent className="overflow-x-auto">
						<div className="w-full min-w-[250px] h-[250px] sm:h-[300px]">
							{dailyChartData.length > 0 ? (
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={dailyChartData}
										margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
									>
										<XAxis
											dataKey="date"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											fontSize={12}
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											fontSize={12}
										/>
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
										<Bar
											dataKey="hours"
											fill="var(--chart-1)"
											radius={[4, 4, 0, 0]}
										/>
									</BarChart>
								</ResponsiveContainer>
							) : (
								<div className="flex items-center justify-center h-full text-muted-foreground">
									No activity data available
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					{" "}
					<CardHeader>
						<CardTitle className="text-base sm:text-lg">
							Language Distribution
						</CardTitle>
						<CardDescription className="text-xs sm:text-sm">
							Top programming languages used this week
						</CardDescription>
					</CardHeader>
					<CardContent className="overflow-x-auto">
						<div className="w-full min-w-[250px] flex flex-col items-center">
							{languageChartData.length > 0 ? (
								<>
									<ResponsiveContainer
										width={"100%"}
										height={200}
										minWidth={200}
										minHeight={150}
									>
										<PieChart>
											<Pie
												data={languageChartData}
												cx="50%"
												cy="50%"
												innerRadius={40}
												outerRadius={80}
												dataKey="percent"
											>
												{languageChartData.map((entry) => (
													<Cell key={entry.name} fill={entry.fill} />
												))}
											</Pie>
											<Tooltip
												content={({ active, payload }) => {
													if (active && payload && payload.length) {
														const data = payload[0].payload;
														return (
															<div className="bg-background border rounded-lg p-2 shadow-md">
																<p className="font-medium">{data.name}</p>
																<p className="text-sm text-muted-foreground">
																	{data.percent != null
																		? data.percent.toFixed(1)
																		: "N/A"}
																	% • {formatDuration(data.total_seconds || 0)}
																</p>
															</div>
														);
													}
													return null;
												}}
											/>
										</PieChart>
									</ResponsiveContainer>
									<div className="space-y-2 w-full max-w-xs mx-auto mt-4">
										{validLanguages.map((lang, index) => (
											<div
												key={lang.name}
												className="flex items-center justify-between"
											>
												<div className="flex items-center gap-2">
													<div
														className="w-3 h-3 rounded-full"
														style={{
															backgroundColor: COLORS[index % COLORS.length],
														}}
													/>
													<span className="text-xs sm:text-sm font-medium">
														{lang.name}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<Badge variant="secondary" className="text-xs">
														{lang.percent != null
															? lang.percent.toFixed(1)
															: "N/A"}
														%
													</Badge>
													<span className="text-xs text-muted-foreground">
														{formatDuration(lang.total_seconds || 0)}
													</span>
												</div>
											</div>
										))}
									</div>
								</>
							) : (
								<div className="flex items-center justify-center h-[200px] text-muted-foreground">
									No language data available
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="group relative overflow-hidden border  bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
				{" "}
				<CardContent className="pt-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-muted-foreground gap-2">
						<span>
							Data range:{" "}
							{summary.range?.start_date
								? new Date(summary.range.start_date).toLocaleDateString()
								: "N/A"}{" "}
							-{" "}
							{summary.range?.end_date
								? new Date(summary.range.end_date).toLocaleDateString()
								: "N/A"}
						</span>
						<span>
							Last updated:{" "}
							{summaryResult.timestamp
								? new Date(summaryResult.timestamp).toLocaleTimeString()
								: "N/A"}
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
