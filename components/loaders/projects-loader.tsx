import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoader() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-5 min-h-[72vh]">
			{Array.from({ length: 6 }).map(() => (
				<div
					key={crypto.randomUUID()}
					className="w-full h-full bg-card p-6 flex flex-col justify-between border border-border group"
				>
					<div>
						<div className="flex items-center justify-between mb-3">
							<Skeleton className="h-6 w-2/3" />
							<Skeleton className="h-5 w-16" />
						</div>
						<Skeleton className="h-4 w-full mb-4" />
						<div className="flex flex-wrap gap-2 mb-4">
							<Skeleton className="h-5 w-16" />
							<Skeleton className="h-5 w-14" />
							<Skeleton className="h-5 w-12" />
						</div>
					</div>
					<div className="mt-auto pt-4 border-t border-border/50">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Skeleton className="h-3 w-20" />
								<div className="w-px h-3 bg-border" />
								<div className="flex items-center gap-2">
									<Skeleton className="h-6 w-6 rounded" />
									<Skeleton className="h-6 w-6 rounded" />
								</div>
							</div>
							<Skeleton className="h-7 w-24" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
