import { PageLayout } from "@/components/page-layout";

export default function Loading() {
	return (
		<PageLayout className="flex flex-col justify-between w-full border-border border-x border-t p-4 gap-4">
			<div className="h-4 w-24 bg-muted rounded mb-2" />
			<div className="h-6 w-2/3 bg-muted rounded mb-2" />
			<div className="h-4 w-full bg-muted rounded" />
			<div className="h-4 w-24 bg-muted rounded mb-2" />
		</PageLayout>
	);
}
