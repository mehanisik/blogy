import { PageLayout } from "@/components/page-layout";

export default function Loading() {
	return (
		<PageLayout className="flex flex-col border-b justify-between w-full h-[calc(100vh-100px)] border-border border-x border-t">
			{["post-1", "post-2", "post-3"].map((key) => (
				<div
					key={key}
					className="rounded-lg border bg-gradient-to-br from-background to-muted p-4 flex flex-col gap-4 animate-pulse"
				>
					<div className="flex items-center gap-2">
						<div className="h-4 w-20 bg-muted rounded" />
						<div className="h-4 w-12 bg-muted rounded" />
					</div>
					<div className="h-6 w-2/3 bg-muted rounded" />
					<div className="h-4 w-full bg-muted rounded" />
				</div>
			))}
		</PageLayout>
	);
}
