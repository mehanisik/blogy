import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import PageLayout from "@/components/layout/page-layout";
import { RecentActivities } from "@/components/recent-activities";
import { SocialLinks } from "@/components/social-links";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<PageLayout>
			<div className="space-y-12 transition-colors duration-200">
				<HeroSection />
				<AboutSection />
				<RecentActivities />
				<SocialLinks />
			</div>
		</PageLayout>
	);
}
