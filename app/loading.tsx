import { PageLayout } from "@/components/page-layout";

export default function Loading() {
	return (
		<PageLayout className="w-full max-w-full space-y-6 p-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				{["card-1", "card-2", "card-3", "card-4"].map((key) => (
					<div
						key={key}
						className="rounded-lg border bg-gradient-to-br from-background to-muted p-4 h-28 flex flex-col justify-between animate-pulse"
					>
						<div className="flex flex-row items-center justify-between">
							<div className="h-4 w-20 bg-muted rounded" />
							<div className="h-4 w-4 bg-muted rounded-full" />
						</div>
						<div className="h-6 w-24 bg-muted rounded mt-4" />
						<div className="h-3 w-16 bg-muted rounded mt-2" />
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="rounded-lg border bg-gradient-to-br from-background to-muted p-4 animate-pulse">
					<div className="h-5 w-32 bg-muted rounded mb-2" />
					<div className="h-3 w-48 bg-muted rounded mb-4" />
					<div className="w-full h-48 bg-muted rounded" />
				</div>
				<div className="rounded-lg border bg-gradient-to-br from-background to-muted p-4 animate-pulse flex flex-col items-center">
					<div className="h-5 w-40 bg-muted rounded mb-2" />
					<div className="h-3 w-48 bg-muted rounded mb-4" />
					<div className="w-32 h-32 bg-muted rounded-full mb-4" />
					<div className="space-y-2 w-full max-w-xs mx-auto">
						{["lang-1", "lang-2", "lang-3"].map((key) => (
							<div key={key} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-muted" />
									<div className="h-3 w-16 bg-muted rounded" />
								</div>
								<div className="flex items-center gap-2">
									<div className="h-3 w-8 bg-muted rounded" />
									<div className="h-3 w-12 bg-muted rounded" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="rounded-lg border bg-gradient-to-br from-background to-muted p-4 mt-4 animate-pulse">
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
					<div className="h-3 w-40 bg-muted rounded mb-2" />
					<div className="h-3 w-32 bg-muted rounded mb-2" />
				</div>
			</div>
		</PageLayout>
	);
}
