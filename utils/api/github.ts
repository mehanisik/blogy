import type { GitHubEvent } from "@/types/github";

interface GithubActivitiesResult {
	data: GitHubEvent[] | null;
	error: string | null;
}

export const getGithubActivities =
	async (): Promise<GithubActivitiesResult> => {
		try {
			if (typeof process !== "undefined" && process.env.VERCEL === "1") {
				console.warn("Vercel build environment detected, returning empty data");
				return { data: null, error: "Build environment - no API calls" };
			}

			const result = await fetch(
				"https://api.github.com/users/mehanisik/events",
				{
					headers: {
						"Content-Type": "application/json",
						"User-Agent": "NGWeb",
					},
					cache: "force-cache",
					next: {
						revalidate: 3600,
					},
				},
			);

			if (!result.ok) {
				console.warn(
					`GitHub API returned status ${result.status}: ${result.statusText}`,
				);
				return { data: null, error: `GitHub API error: ${result.status}` };
			}

			const data = await result.json();
			return { data: data as GitHubEvent[], error: null };
		} catch (error) {
			console.warn("GitHub API call failed during build:", error);
			return { data: null, error: "Failed to fetch GitHub activities" };
		}
	};
