import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailLoader() {
	return (
		<div className="w-full py-5 space-y-6">
			<Skeleton className="h-6 w-16 mb-6" />
			<div className="mb-12">
				<div className="flex items-start justify-between gap-4 mb-6">
					<Skeleton className="h-8 w-1/2" />
					<div className="flex gap-2">
						<Skeleton className="h-5 w-16" />
						<Skeleton className="h-5 w-16" />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="space-y-2">
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-3 w-40" />
						<Skeleton className="h-3 w-36" />
						<Skeleton className="h-3 w-24" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-28" />
						<div className="flex flex-wrap gap-2">
							<Skeleton className="h-5 w-16" />
							<Skeleton className="h-5 w-14" />
							<Skeleton className="h-5 w-12" />
						</div>
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-28" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-5 w-20" />
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<div className="lg:col-span-3 space-y-8">
					<Skeleton className="h-80 w-full" />
					<div className="space-y-3">
						<Skeleton className="h-5 w-24" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>
					<div className="space-y-3">
						<Skeleton className="h-5 w-24" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>
				</div>
				<div className="space-y-6">
					<Skeleton className="h-40 w-full" />
					<Skeleton className="h-48 w-full" />
					<Skeleton className="h-40 w-full" />
				</div>
			</div>
		</div>
	);
}
