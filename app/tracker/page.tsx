import { Suspense } from "react";
import { GitHubCard } from "@/components/github-card";
import { LanguageBreakdown } from "@/components/language-breakdown";
import { PageLayout } from "@/components/page-layout";
import { ProjectBreakdown } from "@/components/project-breakdown";
import { WakaTimeCard } from "@/components/wakatime-card";
import { WeeklyActivity } from "@/components/weekly-activity";
import {
	getGitHubActivity,
	getGitHubRepos,
	getGitHubUser,
} from "@/utils/github";
import { getWakaTimeStats } from "@/utils/wakatime";
import TrackerLoading from "./loading";

async function TrackerContent() {
	const [wakaTimeStats, githubUser, githubRepos, githubActivity] =
		await Promise.allSettled([
			getWakaTimeStats(),
			getGitHubUser(),
			getGitHubRepos(10),
			getGitHubActivity(10),
		]);

	const stats =
		wakaTimeStats.status === "fulfilled" ? wakaTimeStats.value : null;
	const user = githubUser.status === "fulfilled" ? githubUser.value : null;
	const repos = githubRepos.status === "fulfilled" ? githubRepos.value : [];
	const activity =
		githubActivity.status === "fulfilled" ? githubActivity.value : [];

	return (
		<div className="space-y-6 sm:space-y-8">
			<div className="space-y-2 sm:space-y-3">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Tracker</h1>
				<p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
					My coding activity and development insights
				</p>
			</div>

			{stats ? (
				<div className="space-y-6 sm:space-y-8">
					<WeeklyActivity stats={stats} />

					<div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
						<WakaTimeCard stats={stats} />
						<GitHubCard user={user} repos={repos} activity={activity} />
					</div>

					<div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
						<LanguageBreakdown stats={stats} />
						<ProjectBreakdown stats={stats} />
					</div>
				</div>
			) : (
				<div className="space-y-4 sm:space-y-6">
					<div className="rounded-lg border border-border bg-card p-6 sm:p-8 text-center">
						<p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
							WakaTime data not available. Please check your API key
							configuration.
						</p>
						<div className="text-xs sm:text-sm text-muted-foreground space-y-1">
							<p>Required environment variables:</p>
							<ul className="list-disc list-inside space-y-1">
								<li>WAKATIME_API_KEY - Your WakaTime API key</li>
								<li>GITHUB_TOKEN - Your GitHub personal access token</li>
								<li>GITHUB_USERNAME - Your GitHub username</li>
							</ul>
						</div>
					</div>

					{user && (
						<div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
							<div className="rounded-lg border border-border bg-card p-4 sm:p-6 text-center">
								<p className="text-sm sm:text-base text-muted-foreground">
									WakaTime integration not configured
								</p>
							</div>
							<GitHubCard user={user} repos={repos} activity={activity} />
						</div>
					)}
				</div>
			)}

			{!stats && !user && (
				<div className="rounded-lg border border-border bg-card p-6 sm:p-8 text-center">
					<p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
						No tracker data available. Please configure your WakaTime and GitHub
						API keys.
					</p>
					<div className="text-xs sm:text-sm text-muted-foreground space-y-1">
						<p>Required environment variables:</p>
						<ul className="list-disc list-inside space-y-1">
							<li>WAKATIME_API_KEY - Your WakaTime API key</li>
							<li>GITHUB_TOKEN - Your GitHub personal access token</li>
							<li>GITHUB_USERNAME - Your GitHub username</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default function TrackerPage() {
	return (
		<PageLayout>
			<Suspense fallback={<TrackerLoading />}>
				<TrackerContent />
			</Suspense>
		</PageLayout>
	);
}
