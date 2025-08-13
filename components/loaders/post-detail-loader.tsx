import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetailLoader() {
	return (
		<div className="w-full py-5 px-5 md:px-0">
			<Skeleton className="h-8 w-2/3 mb-2" />
			<Skeleton className="h-5 w-1/3 mb-3" />
			<div className="flex items-center gap-3 mb-3">
				<Skeleton className="h-3 w-20" />
				<Skeleton className="h-3 w-16" />
				<Skeleton className="h-3 w-24" />
			</div>
			<div className="mb-6 flex flex-wrap gap-2">
				{Array.from({ length: 3 }).map(() => (
					<Skeleton key={crypto.randomUUID()} className="h-6 w-20" />
				))}
			</div>
			<Skeleton className="h-[50vh] w-full" />
		</div>
	);
}
