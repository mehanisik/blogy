import { PageLayout } from "@/components/page-layout";

export default function PostsLoading() {
	return (
		<PageLayout>
			<div className="py-16">
				<div className="space-y-12">
					<div className="grid gap-6">
						{Array.from({ length: 5 }).map((_) => (
							<div
								key={crypto.randomUUID()}
								className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-4"
							>
								<div className="space-y-2">
									<div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
									<div className="space-y-2">
										<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse" />
										<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 animate-pulse" />
									</div>
								</div>

								<div className="flex flex-wrap gap-2">
									{Array.from({ length: 3 }).map((_) => (
										<div
											key={crypto.randomUUID()}
											className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"
										/>
									))}
								</div>

								<div className="flex items-center gap-4">
									<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 animate-pulse" />
									<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse" />
									<div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-full w-20 animate-pulse" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
