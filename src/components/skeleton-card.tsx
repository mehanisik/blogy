export function SkeletonCard() {
	return (
		<article className="p-4 sm:p-5 flex border-b border-gray-200 dark:border-[#313131] transition-colors animate-pulse bg-white dark:bg-[#131313]">
			<div className="block w-full text-left rounded-lg focus:outline-none">
				<div className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
					<div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
					<div className="flex-1 min-w-0">
						<div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />

						<div className="space-y-2 mb-3">
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12" />
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
						</div>

						<div className="flex flex-wrap gap-2 mt-3">
							<div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
							<div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
							<div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default SkeletonCard;
