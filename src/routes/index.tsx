import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { PageLayout } from "@/components/layout/page-layout";
import { RecentActivities } from "@/components/recent-activities";
import { SocialLinks } from "@/components/social-links";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<PageLayout
			title="Welcome to Blogy"
			description="A modern blog platform for sharing your thoughts and ideas. Join our community of writers and readers."
			keywords={[
				"blog",
				"writing",
				"personal blog",
				"blogging platform",
				"community",
				"articles",
				"software engineer",
				"software development",
				"web development",
				"full stack development",
				"frontend development",
				"backend development",
				"personal website",
				"portfolio",
				"software engineer portfolio",
				"software engineer personal website",
				"software engineer blog",
				"software engineer projects",
			]}
		>
			<div className="space-y-12 transition-colors duration-200">
				<HeroSection />
				<AboutSection />
				<RecentActivities />
				<SocialLinks />
			</div>
		</PageLayout>
	);
}
