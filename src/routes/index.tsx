import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { PageLayout } from "@/components/layout/page-layout";
import { RecentActivities } from "@/components/recent-activities";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<PageLayout
			title="Personal Website"
			description="My personal blog and portfolio showcasing my projects and writing on software engineering and development."
		>
			<div className="flex flex-col gap-4">
				<HeroSection />
				<AboutSection />
				<RecentActivities />
			</div>
		</PageLayout>
	);
}
