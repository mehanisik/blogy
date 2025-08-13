import { Skeleton } from "@/components/ui/skeleton";

export default function PublicationDetailLoader() {
	return (
		<div className="w-full py-5 space-y-6">
			<Skeleton className="h-6 w-16" />
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Skeleton className="w-4 h-4 rounded" />
					<Skeleton className="h-3 w-24" />
				</div>
				<Skeleton className="h-8 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-6 w-24" />
				</div>
				<Skeleton className="h-20 w-full" />
				<Skeleton className="w-full min-h-[800px]" />
			</div>
		</div>
	);
}
