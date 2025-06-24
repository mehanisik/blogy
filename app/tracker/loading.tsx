import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TrackerLoading() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">Tracker</h1>
				<p className="text-muted-foreground">
					Loading your coding activity and GitHub data...
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<div className="h-5 w-5 animate-pulse rounded bg-muted" />
							<div className="h-6 w-32 animate-pulse rounded bg-muted" />
						</div>
						<div className="h-4 w-24 animate-pulse rounded bg-muted" />
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<div className="h-4 w-16 animate-pulse rounded bg-muted" />
								<div className="h-8 w-20 animate-pulse rounded bg-muted" />
							</div>
							<div className="space-y-2">
								<div className="h-4 w-16 animate-pulse rounded bg-muted" />
								<div className="h-6 w-24 animate-pulse rounded bg-muted" />
							</div>
						</div>
						<div className="space-y-3">
							{Array.from({ length: 3 }).map(() => (
								<div key={crypto.randomUUID()} className="space-y-2">
									<div className="h-4 w-20 animate-pulse rounded bg-muted" />
									<div className="space-y-2">
										{Array.from({ length: 3 }).map(() => (
											<div
												key={crypto.randomUUID()}
												className="flex items-center justify-between"
											>
												<div className="h-3 w-16 animate-pulse rounded bg-muted" />
												<div className="h-5 w-8 animate-pulse rounded bg-muted" />
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<div className="h-5 w-5 animate-pulse rounded bg-muted" />
							<div className="h-6 w-32 animate-pulse rounded bg-muted" />
						</div>
						<div className="h-4 w-24 animate-pulse rounded bg-muted" />
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-3 gap-4">
							{Array.from({ length: 3 }).map(() => (
								<div
									key={crypto.randomUUID()}
									className="text-center space-y-1"
								>
									<div className="h-8 w-12 animate-pulse rounded bg-muted mx-auto" />
									<div className="h-3 w-16 animate-pulse rounded bg-muted mx-auto" />
								</div>
							))}
						</div>
						<div className="space-y-3">
							{Array.from({ length: 2 }).map(() => (
								<div key={crypto.randomUUID()} className="space-y-2">
									<div className="h-4 w-24 animate-pulse rounded bg-muted" />
									<div className="space-y-2">
										{Array.from({ length: 3 }).map(() => (
											<div
												key={crypto.randomUUID()}
												className="flex items-center justify-between"
											>
												<div className="h-3 w-20 animate-pulse rounded bg-muted" />
												<div className="h-5 w-8 animate-pulse rounded bg-muted" />
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
