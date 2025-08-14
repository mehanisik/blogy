import type { GitHubEvent } from "@/types/github";

interface GithubActivitiesResult {
	data: GitHubEvent[] | null;
	error: string | null;
}

export const getGithubActivities =
	async (): Promise<GithubActivitiesResult> => {
		try {
			if (typeof process !== "undefined") {
				if (
					process.env.NODE_ENV === "production" &&
					!process.env.GITHUB_TOKEN
				) {
					console.warn(
						"GitHub API not available during build, returning empty data",
					);
					return {
						data: null,
						error: "GitHub API not available during build",
					};
				}

				if (process.env.VERCEL || process.env.NETLIFY || process.env.BUILD_ID) {
					console.warn(
						"Detected build environment, returning empty data to prevent build failures",
					);
					return { data: null, error: "Build environment detected" };
				}
			}

			const response = await fetch(
				"https://api.github.com/users/mehanisik/events",
				{
					next: { revalidate: 3600 },
					signal: AbortSignal.timeout(10000),
				},
			);

			if (!response.ok) {
				console.warn(
					`GitHub API returned status ${response.status}: ${response.statusText}`,
				);
				return {
					data: null,
					error: `GitHub API returned status ${response.status} (${response.statusText})`,
				};
			}

			const data = (await response.json()) as GitHubEvent[];
			return { data, error: null };
		} catch (err: unknown) {
			if (err instanceof Error) {
				if (err.name === "AbortError") {
					console.warn("GitHub API request timed out");
					return { data: null, error: "Request timed out" };
				}
				if (err.message.includes("fetch")) {
					console.warn("Network error during GitHub API call:", err.message);
					return { data: null, error: "Network error" };
				}
				console.warn("GitHub API error:", err.message);
				return {
					data: null,
					error: `Failed to fetch GitHub activities: ${err.message}`,
				};
			}

			console.warn("Unknown error during GitHub API call:", err);
			return { data: null, error: "Unknown error occurred" };
		}
	};
