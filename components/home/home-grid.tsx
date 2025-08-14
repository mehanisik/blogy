import { Suspense } from "react";
import {
	AboutCard,
	CodingStatsCard,
	EducationCard,
	HobbiesCard,
	LocationCard,
	RecentActivityCard,
} from "@/components/home/cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton({ title }: { title: string }) {
	return (
		<Card className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 border border-muted">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<Skeleton className="h-4 w-1/3" />
				<Skeleton className="h-3 w-2/3" />
				<Skeleton className="h-3 w-1/2" />
			</CardContent>
		</Card>
	);
}

export async function HomeGrid() {
	return (
		<div className="flex h-full w-full items-center justify-center min-h-[70vh]">
			<div className="grid h-full w-full gap-2  lg:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-lg py-5">
				<Suspense fallback={<CardSkeleton title="Recent Activity" />}>
					<RecentActivityCard />
				</Suspense>
				<EducationCard />
				<Suspense fallback={<CardSkeleton title="Coding Summary (7d)" />}>
					<CodingStatsCard />
				</Suspense>
				<AboutCard />
				<HobbiesCard />
				<LocationCard />
			</div>
		</div>
	);
}
