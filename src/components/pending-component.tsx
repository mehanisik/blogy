import PageLayout from "@/components/layout/page-layout";
import SkeletonCard from "@/components/skeleton-card";

interface PendingComponentProps {
	title: string;
	count?: number;
	className?: string;
}

export function PendingComponent({
	title,
	count = 3,
	className = "grid gap-8",
}: PendingComponentProps) {
	return (
		<PageLayout title={title}>
			<div className={className}>
				{Array.from({ length: count }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		</PageLayout>
	);
}
