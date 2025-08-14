import {
	BarChart3,
	Calendar,
	Clock,
	Code,
	PieChart,
	Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function TotalTimeSkeleton() {
	return (
		<Card className="h-full border border-muted">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-sm font-medium">
					<Clock className="h-4 w-4" />
					Total Time (7d)
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-9 w-32 mb-1" />
				<Skeleton className="h-3 w-40 mb-3" />
				<Separator className="my-3" />
				<div className="flex items-center gap-2">
					<Code className="h-3 w-3" />
					<Skeleton className="h-3 w-24" />
				</div>
			</CardContent>
		</Card>
	);
}

export function DailyAverageSkeleton() {
	return (
		<Card className="h-full border border-muted">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-sm font-medium">
					<BarChart3 className="h-4 w-4" />
					Daily Average
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-9 w-32 mb-1" />
				<Skeleton className="h-3 w-32 mb-3" />
				<Separator className="my-3" />
				<div className="flex items-center gap-2">
					<BarChart3 className="h-3 w-3" />
					<Skeleton className="h-3 w-28" />
				</div>
			</CardContent>
		</Card>
	);
}

export function BestDaySkeleton() {
	return (
		<Card className="h-full border border-muted">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-sm font-medium">
					<Trophy className="h-4 w-4" />
					Best Day
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-9 w-24 mb-1" />
				<Skeleton className="h-3 w-20 mb-3" />
				<Separator className="my-3" />
				<div className="flex items-center gap-2">
					<Calendar className="h-3 w-3" />
					<Skeleton className="h-3 w-16" />
				</div>
			</CardContent>
		</Card>
	);
}

export function MostUsedLanguageSkeleton() {
	return (
		<Card className="h-full border border-muted">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-sm font-medium">
					<Code className="h-4 w-4" />
					Most Used Language
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-9 w-20 mb-1" />
				<Skeleton className="h-3 w-32 mb-3" />
				<Separator className="my-3" />
				<div className="flex items-center gap-2">
					<PieChart className="h-3 w-3" />
					<Skeleton className="h-3 w-20" />
				</div>
			</CardContent>
		</Card>
	);
}

export function DailyActivitySkeleton() {
	return (
		<Card className="h-full border border-muted">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-sm font-medium">
					<BarChart3 className="h-4 w-4" />
					Daily Activity
				</CardTitle>
			</CardHeader>
			<CardContent className="h-[350px]">
				<Skeleton className="h-full w-full" />
			</CardContent>
		</Card>
	);
}

export function TopLanguagesSkeleton() {
	return (
		<Card className="h-full border border-muted">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-sm font-medium">
					<PieChart className="h-4 w-4" />
					Top Languages
				</CardTitle>
			</CardHeader>
			<CardContent className="h-[350px]">
				<Skeleton className="h-full w-full" />
			</CardContent>
		</Card>
	);
}

export function TrackerSkeleton() {
	return (
		<div className="w-full py-6 min-h-[72vh] px-3 md:px-0">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
				<div className="lg:col-span-3">
					<TotalTimeSkeleton />
				</div>
				<div className="lg:col-span-3">
					<DailyAverageSkeleton />
				</div>
				<div className="lg:col-span-3">
					<BestDaySkeleton />
				</div>
				<div className="lg:col-span-3">
					<MostUsedLanguageSkeleton />
				</div>
				<div className="sm:col-span-2 lg:col-span-8">
					<DailyActivitySkeleton />
				</div>
				<div className="sm:col-span-2 lg:col-span-4">
					<TopLanguagesSkeleton />
				</div>
			</div>
		</div>
	);
}
