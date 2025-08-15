import { getGithubActivities } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/utils/helpers/date";
import { getEventAction } from "@/utils/helpers/get-event-action";

export async function RecentActivityCard() {
	const result = await getGithubActivities();

	if (!result || result.length === 0) {
		return (
			<Card className="w-full h-[220px] col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 border border-muted hover:border-muted-foreground/20 transition-colors">
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>
				<CardContent>
					{[1, 2, 3].map((id) => (
						<div
							key={`activity-skeleton-${id}`}
							className="flex flex-col gap-1 pb-3 border-b last:border-none border-muted"
						>
							<div className="flex items-center gap-2">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-3 w-20" />
								<Skeleton className="h-3 w-12 ml-auto" />
							</div>
							<Skeleton className="h-3 w-full ml-1.5" />
						</div>
					))}
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full h-[220px] col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 border border-muted hover:border-muted-foreground/20 transition-colors">
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				{result.slice(0, 3).map((event) => (
					<div
						key={event.id}
						className="flex flex-col gap-1 pb-3 border-b last:border-none border-muted hover:bg-muted/20 transition-colors px-1 -mx-1"
					>
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="px-1.5 py-0 text-[0.65rem] font-mono hover:bg-muted-foreground/10 transition-colors"
							>
								{event.repo.name.split("/")[1]}
							</Badge>
							<span className="text-xs text-foreground/80">
								{getEventAction(event)}
							</span>
							<span className="ml-auto text-[0.65rem] text-foreground/70">
								{timeAgo(event.created_at)}
							</span>
						</div>
						{event.payload?.commits?.[0]?.message && (
							<p className="ml-1.5 text-xs truncate text-foreground/80 font-mono">
								{event.payload.commits[0].message}
							</p>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}
