import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PublicationsLoader() {
	return (
		<div className="w-full py-5 min-h-[72vh] space-y-3">
			{[...Array(2)].map(() => (
				<Card
					key={crypto.randomUUID()}
					className="bg-background rounded-xl shadow-none border border-border/40"
				>
					<CardContent className="p-4 sm:p-5 flex gap-4">
						<div className="relative hidden sm:block w-28 h-36 rounded-lg overflow-hidden bg-background">
							<Skeleton className="w-full h-full" />
						</div>
						<div className="flex-1 flex flex-col gap-3 min-w-0">
							<div className="flex items-start justify-between gap-2">
								<Skeleton className="h-5 w-2/3" />
								<Skeleton className="h-4 w-4" />
							</div>
							<Skeleton className="h-4 w-3/4" />
							<div className="flex flex-wrap gap-1.5">
								<Skeleton className="h-6 w-24" />
								<Skeleton className="h-6 w-20" />
								<Skeleton className="h-6 w-16" />
							</div>
							<div className="flex flex-wrap items-center gap-3 text-xs">
								<Skeleton className="h-3 w-40" />
								<Skeleton className="h-3 w-20" />
								<Skeleton className="h-3 w-16" />
								<Skeleton className="h-3 w-28" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
