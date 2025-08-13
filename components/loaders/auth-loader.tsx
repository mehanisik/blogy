import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoader() {
	return (
		<div className="flex min-h-[80vh] items-center justify-center py-10 px-2">
			<main className="w-full max-w-md mx-auto border p-4 space-y-6">
				<div className="text-center space-y-2">
					<Skeleton className="h-7 w-40 mx-auto" />
					<Skeleton className="h-4 w-56 mx-auto" />
				</div>
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-10 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-3 w-60 mx-auto" />
			</main>
		</div>
	);
}
