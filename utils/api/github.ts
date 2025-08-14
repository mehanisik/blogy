import type { GitHubEvent } from "@/types/github";

interface GithubActivitiesResult {
	data: GitHubEvent[] | null;
	error: string | null;
}

export const getGithubActivities =
	async (): Promise<GithubActivitiesResult> => {
		try {
			const response = await fetch(
				"https://api.github.com/users/mehanisik/events",
				{
					next: { revalidate: 3600 },
				},
			);

			if (!response.ok) {
				return {
					data: null,
					error: `GitHub API returned status ${response.status} (${response.statusText})`,
				};
			}

			const data = (await response.json()) as GitHubEvent[];
			return { data, error: null };
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Unknown error occurred";
			return {
				data: null,
				error: `Failed to fetch GitHub activities: ${message}`,
			};
		}
	};
