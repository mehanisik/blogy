"use client";

import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	return (
		<PageLayout className="flex flex-col items-center justify-center h-screen">
			<div className="text-center space-y-6">
				<div className="space-y-4">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
						Something went wrong!
					</h1>
					<p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
						An unexpected error occurred. Please try again or contact support if
						the problem persists.
					</p>
					<Button
						onClick={() => reset()}
						className="rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-10 py-2.5 text-base font-semibold uppercase tracking-widest transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
					>
						Try again
					</Button>
					{process.env.NODE_ENV === "development" && (
						<details className="text-left max-w-md mx-auto mt-4">
							<summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
								Error details (development only)
							</summary>
							<pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto">
								{error.message}
							</pre>
						</details>
					)}
				</div>
			</div>
		</PageLayout>
	);
}
