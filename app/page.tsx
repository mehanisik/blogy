import type { Metadata } from "next";
import { getWakatimeStats, getWakatimeSummaries } from "@/app/actions/wakatime";
import { CodingStatsCard } from "@/components/home/cards";
import {
	AboutCard,
	EducationCard,
	InterestsCard,
	LocationCard,
	RecentActivityCard,
} from "@/components/home/page";
import { siteConfig } from "@/siteconfig";
import { getBaseUrl } from "@/utils/helpers";

export const metadata: Metadata = {
	title: "Home",
	description: siteConfig.seo.description,
	alternates: { canonical: getBaseUrl() },
	openGraph: {
		title: siteConfig.seo.defaultTitle,
		description: siteConfig.seo.description,
		url: getBaseUrl(),
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: siteConfig.seo.openGraph.imageAlt,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.seo.defaultTitle,
		description: siteConfig.seo.description,
		images: [siteConfig.seo.openGraph.imagePath],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
};

const githubUsername = "mehanisik";

export default async function Home() {
	const [wakatimeStats, wakatimeSummaries] = await Promise.all([
		getWakatimeStats("last_7_days"),
		getWakatimeSummaries("last_7_days"),
	]);

	return (
		<main className="flex-1 overflow-auto bg-background">
			<div className="mx-auto h-full max-w-7xl py-6">
				<div className="card-grid grid h-full auto-rows-fr grid-cols-1 gap-px border bg-border md:grid-cols-3">
					<AboutCard username={githubUsername} />
					<EducationCard />
					<RecentActivityCard username={githubUsername} />
					<InterestsCard />
					<LocationCard />
					<div className="col-span-1 row-span-1">
						<CodingStatsCard
							languagesResult={wakatimeStats}
							summariesResult={wakatimeSummaries}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
