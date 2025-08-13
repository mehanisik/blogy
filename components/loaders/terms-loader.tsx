import { Skeleton } from "@/components/ui/skeleton";

export default function TermsLoader() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto space-y-4">
				<Skeleton className="h-10 w-64" />
				<Skeleton className="h-4 w-40" />
				{Array.from({ length: 5 }).map(() => (
					<Skeleton key={crypto.randomUUID()} className="h-20 w-full" />
				))}
			</div>
		</div>
	);
}
