import { PageLayout } from "@/components/page-layout";

export default function Loading() {
	return (
		<PageLayout className="flex flex-col justify-between w-full border-border border-x border-t p-4">
			{["pub-1", "pub-2", "pub-3"].map((key) => (
				<div
					key={key}
					className="rounded-lg border bg-gradient-to-br from-background to-muted p-4 flex flex-col gap-4 animate-pulse"
				>
					<div className="h-4 w-24 bg-muted rounded mb-2" />
					<div className="h-6 w-2/3 bg-muted rounded mb-2" />
					<div className="h-4 w-full bg-muted rounded" />
				</div>
			))}
		</PageLayout>
	);
}
