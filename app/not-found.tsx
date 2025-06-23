import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

export default function NotFound() {
	return (
		<PageLayout className="flex flex-col items-center justify-center h-screen">
			<div className="text-center space-y-6">
				<div className="space-y-4">
					<h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
						404
					</h1>
					<h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
						Page Not Found
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
						Sorry, we couldn't find the page you're looking for. It might have
						been moved, deleted, or you entered the wrong URL.
					</p>
				</div>
				<div className="space-y-4">
					<Link
						href="/"
						className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
					>
						Go back home
					</Link>
				</div>
			</div>
		</PageLayout>
	);
}
