import { PageLayout } from "@/components/page-layout";

export default function PublicationsLoading() {
	return (
		<PageLayout>
			<div className="py-16">
				<div className="space-y-12">
					<div className="grid gap-8">
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={crypto.randomUUID()}
								className="border border-border rounded-lg p-6 space-y-4 animate-slide-up"
								style={{
									animationDelay: `${index * 100}ms`,
									animationFillMode: "both",
								}}
							>
								<div className="space-y-3">
									<div className="h-6 bg-muted rounded w-full animate-pulse" />
									<div className="space-y-2">
										<div className="h-4 bg-muted rounded w-full animate-pulse" />
										<div className="h-4 bg-muted rounded w-full animate-pulse" />
										<div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<div className="h-4 bg-muted rounded w-16 animate-pulse" />
										<div className="h-4 bg-muted rounded w-48 animate-pulse" />
									</div>
									<div className="flex items-center gap-2">
										<div className="h-4 bg-muted rounded w-20 animate-pulse" />
										<div className="h-4 bg-muted rounded w-40 animate-pulse" />
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1">
											<div className="w-4 h-4 bg-muted rounded animate-pulse" />
											<div className="h-4 bg-muted rounded w-16 animate-pulse" />
										</div>
										<div className="h-5 bg-muted rounded-full w-20 animate-pulse" />
									</div>
									<div className="flex items-center gap-3">
										<div className="h-4 bg-muted rounded w-16 animate-pulse flex items-center gap-1">
											<div className="w-4 h-4 bg-muted/50 rounded" />
										</div>
										<div className="h-4 bg-muted rounded w-12 animate-pulse flex items-center gap-1">
											<div className="w-4 h-4 bg-muted/50 rounded" />
										</div>
										<div className="h-4 bg-muted rounded w-12 animate-pulse flex items-center gap-1">
											<div className="w-4 h-4 bg-muted/50 rounded" />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
