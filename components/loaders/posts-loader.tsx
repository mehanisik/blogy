import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoader() {
	return (
		<div className="w-full py-5 min-h-[72vh] space-y-3">
			{Array.from({ length: 3 }).map(() => (
				<Card
					key={crypto.randomUUID()}
					className="bg-background rounded-xl shadow-none border border-border/30"
				>
					<CardContent className="p-5 space-y-3">
						<Skeleton className="h-5 w-2/3" />
						<Skeleton className="h-4 w-3/4" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-3 w-16" />
							<Skeleton className="h-3 w-14" />
							<Skeleton className="h-3 w-12" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
