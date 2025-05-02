import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { RecentActivities } from "@/components/recent-activities";
import { SocialLinks } from "@/components/social-links";
import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/layout";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<Layout>
			<HeroSection />
			<AboutSection />
			<RecentActivities />
			<SocialLinks />
		</Layout>
	);
}
