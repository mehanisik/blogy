export function SkeletonCard() {
	return (
		<div className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 animate-pulse">
			<div className="flex justify-between items-start gap-4">
				<div className="flex-1">
					<div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-3" />

					<div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />

					<div className="space-y-2 mb-4">
						<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
						<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
						<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
					</div>

					<div className="flex flex-wrap gap-2 mt-3">
						<div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
						<div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
						<div className="h-6 w-14 bg-gray-200 dark:bg-gray-800 rounded-full" />
					</div>
				</div>

				<div className="flex gap-2 mt-1">
					<div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-full" />
					<div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-full" />
				</div>
			</div>
		</div>
	);
}

export default SkeletonCard;
