import SkeletonCard from "@/components/skeleton-card";
import { PageLayout } from "./layout/page-layout";

interface PendingComponentProps {
	className?: string;
}

export function PendingComponent({
	className = "grid gap-8",
}: PendingComponentProps) {
	return (
		<PageLayout title="Loading..." description="Loading...">
			<div className={className}>
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</PageLayout>
	);
}
