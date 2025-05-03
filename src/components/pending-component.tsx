import SkeletonCard from "@/components/skeleton-card";
import { PageLayout } from "./layout/page-layout";

interface PendingComponentProps {
	title: string;
	count?: number;
	className?: string;
}

export function PendingComponent({
	count = 3,
	className = "grid gap-8",
}: PendingComponentProps) {
	return (
		<PageLayout title="Loading..." description="Loading...">
			<div className={className}>
				{Array.from({ length: count }).map((_, i) => (
					<SkeletonCard
						key={`skeleton-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							i
						}`}
					/>
				))}
			</div>
		</PageLayout>
	);
}
