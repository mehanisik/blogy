import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/siteconfig";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center space-y-4">
					<CardTitle className="text-3xl font-bold text-foreground mb-3">
						{siteConfig.pages.notFound.heading}
					</CardTitle>
					<CardDescription className="text-lg text-muted-foreground">
						{siteConfig.pages.notFound.title}
					</CardDescription>
					<p className="text-muted-foreground max-w-md mx-auto">
						{siteConfig.pages.notFound.description}
					</p>
				</CardHeader>
				<CardContent>
					<Button asChild className="w-full">
						<Link
							href="/"
							className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md hover:bg-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							aria-label="Go back to homepage"
						>
							{siteConfig.pages.notFound.goHomeLabel}
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
