import { Calendar, Clock, Code, TrendingUp } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TotalTimeLoading() {
	return (
		<Card className="group relative overflow-hidden border bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs sm:text-sm font-medium">
					All-Time Total
				</CardTitle>
				<Clock className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-4 w-32" />
				</div>
			</CardContent>
		</Card>
	);
}

export function DailyAverageLoading() {
	return (
		<Card className="group relative overflow-hidden border bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs sm:text-sm font-medium">
					Daily Average (7d)
				</CardTitle>
				<TrendingUp className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-4 w-20" />
				</div>
			</CardContent>
		</Card>
	);
}

export function LastSevenDaysStatsLoading() {
	return (
		<Card className="group relative overflow-hidden border bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs sm:text-sm font-medium">
					Last 7 Days Total
				</CardTitle>
				<Calendar className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<Skeleton className="h-6 w-28" />
					<Skeleton className="h-4 w-32" />
				</div>
			</CardContent>
		</Card>
	);
}

export function TopLanguageLoading() {
	return (
		<Card className="group relative overflow-hidden border bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs sm:text-sm font-medium">
					Top Language (7d)
				</CardTitle>
				<Code className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<Skeleton className="h-6 w-28" />
					<Skeleton className="h-4 w-24" />
				</div>
			</CardContent>
		</Card>
	);
}

export function DailyActivityLoading() {
	return (
		<Card className="h-full group relative overflow-hidden border bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300">
			<CardHeader>
				<CardTitle className="text-base sm:text-lg">
					Daily Activity (7d)
				</CardTitle>
				<CardDescription className="text-xs sm:text-sm">
					Coding hours over the last 7 days
				</CardDescription>
			</CardHeader>
			<CardContent className="h-full flex flex-col overflow-x-auto">
				<Skeleton className="h-[250px] sm:h-[300px] w-full mt-auto" />
			</CardContent>
		</Card>
	);
}

export function LanguageDistributionLoading() {
	return (
		<Card className="h-full group relative overflow-hidden border bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300">
			<CardHeader>
				<CardTitle className="text-base sm:text-lg">
					Language Distribution (7d)
				</CardTitle>
				<CardDescription className="text-xs sm:text-sm">
					Top programming languages used in the last 7 days
				</CardDescription>
			</CardHeader>
			<CardContent className="overflow-x-auto">
				<div className="w-full">
					<div className="w-full h-[250px] sm:h-[300px]">
						<Skeleton className="h-full w-full" />
					</div>
					<div className="space-y-2 w-full max-w-xs mx-auto mt-4">
						{[0, 1, 2, 3].map((key) => (
							<div
								key={`skeleton-${key}`}
								className="flex items-center justify-between"
							>
								<div className="flex items-center gap-2">
									<Skeleton className="h-3 w-3 rounded-full" />
									<Skeleton className="h-4 w-24" />
								</div>
								<Skeleton className="h-4 w-16" />
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
