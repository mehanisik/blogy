import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { RecentActivities } from "@/components/recent-activities";
import { SocialLinks } from "@/components/social-links";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<main className="flex flex-col gap-10 text-gray-800">
			<HeroSection />
			<AboutSection />
			<RecentActivities />
			<SocialLinks />
		</main>
	);
}
