import type { GitHubEvent } from "@/types/github";

export const getGithubActivities = async () => {
	try {
		const response = await fetch(
			"https://api.github.com/users/mehanisik/events",
			{
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) {
			console.warn(`GitHub API error: ${response.status}`);
			return null;
		}

		return (await response.json()) as GitHubEvent[];
	} catch (error) {
		console.error("Failed to fetch GitHub activities:", error);
		return null;
	}
};
