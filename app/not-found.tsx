import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

export default function NotFound() {
	return (
		<PageLayout className="flex flex-col items-center justify-center min-h-screen">
			<div className="text-center space-y-6">
				<div className="space-y-4">
					<h1 className="text-3xl font-bold text-foreground mb-3">404</h1>
					<h2 className="text-lg text-muted-foreground">Page Not Found</h2>
					<p className="text-muted-foreground max-w-md mx-auto">
						Sorry, we couldn't find the page you're looking for. It might have
						been moved, deleted, or you entered the wrong URL.
					</p>
				</div>
				<div className="space-y-4">
					<Link
						href="/"
						className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md hover:bg-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						aria-label="Go back to homepage"
					>
						Go back home
					</Link>
				</div>
			</div>
		</PageLayout>
	);
}
