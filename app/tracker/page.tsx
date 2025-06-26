import { Suspense } from "react";
import { PageLayout } from "@/components/page-layout";
import WakaTimeDashboard from "@/components/wakatime";
import Loading from "../loading";
import {
	getWakaTimeLanguages,
	getWakaTimeLastSevenDays,
	getWakaTimeSummary,
} from "./actions";

export default async function TrackerPage() {
	const [summaryResult, languagesResult, lastSevenDaysResult] =
		await Promise.all([
			getWakaTimeSummary(),
			getWakaTimeLanguages(),
			getWakaTimeLastSevenDays(),
		]);
	return (
		<Suspense fallback={<Loading />}>
			<PageLayout className="flex flex-col justify-between w-full h-full border-border border-x border-t">
				<header className="mb-8 sm:mb-12">
					<h1 className="text-3xl font-light tracking-tight text-foreground mb-3">
						Activity Tracker
					</h1>
					<p className="text-lg text-muted-foreground">
						I use WakaTime to track my coding activity with VSCode extension to
						see how much time I spend on each project so that I can track my
						progress and organize my time better.
					</p>
				</header>
				<WakaTimeDashboard
					summaryResult={summaryResult}
					languagesResult={languagesResult}
					lastSevenDaysResult={lastSevenDaysResult}
				/>
			</PageLayout>
		</Suspense>
	);
}
