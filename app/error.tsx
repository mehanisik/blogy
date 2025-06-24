"use client";

import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	const router = useRouter();

	return (
		<PageLayout className="flex flex-col items-center justify-center min-h-screen">
			<div className="text-center space-y-6" role="alert" aria-live="polite">
				<div className="space-y-4">
					<h1 className="text-4xl font-bold text-foreground">
						Something went wrong!
					</h1>
					<p className="text-muted-foreground max-w-md mx-auto">
						An unexpected error occurred. Please try again or contact support if
						the problem persists.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							onClick={() => reset()}
							className="rounded-md bg-foreground text-background px-10 py-2.5 text-base font-semibold uppercase tracking-widest transition-all hover:bg-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							aria-label="Try to reload the page"
						>
							Try again
						</Button>
						<Button
							onClick={() => router.push("/")}
							variant="outline"
							className="px-10 py-2.5 text-base font-semibold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							aria-label="Go back to homepage"
						>
							Go Home
						</Button>
					</div>
					{process.env.NODE_ENV === "development" && (
						<details className="text-left max-w-md mx-auto mt-4">
							<summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-2">
								Error details (development only)
							</summary>
							<pre className="mt-2 text-xs text-destructive bg-destructive/10 p-2 rounded overflow-auto border border-destructive/20">
								<code>{error.message}</code>
							</pre>
						</details>
					)}
				</div>
			</div>
		</PageLayout>
	);
}
