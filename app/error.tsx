"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/siteconfig";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center space-y-4">
					<CardTitle className="text-3xl font-bold text-foreground">
						{siteConfig.pages.error.title}
					</CardTitle>
					<CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
						{siteConfig.pages.error.description}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							onClick={() => reset()}
							className="rounded-md bg-foreground text-background px-10 py-2.5 text-base font-semibold uppercase tracking-widest transition-all hover:bg-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							aria-label="Try to reload the page"
						>
							{siteConfig.pages.error.tryAgainLabel}
						</Button>
						<Button
							onClick={() => router.push("/")}
							variant="outline"
							className="px-10 py-2.5 text-base font-semibold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							aria-label="Go back to homepage"
						>
							{siteConfig.pages.error.goHomeLabel}
						</Button>
					</div>
					{process.env.NODE_ENV === "development" && (
						<details className="text-left max-w-md mx-auto mt-4">
							<summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-2">
								{siteConfig.pages.error.errorDetailsSummary}
							</summary>
							<pre className="mt-2 text-xs text-destructive bg-destructive/10 p-2 rounded overflow-auto border border-destructive/20">
								<code>{error.message}</code>
							</pre>
						</details>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
