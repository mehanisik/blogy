import type { GitHubEvent } from "@/types/github";

export const getGithubActivities = async (): Promise<GitHubEvent[]> => {
	const result = await fetch("https://api.github.com/users/mehanisik/events", {
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "NGWeb",
		},
		cache: "force-cache",
		next: {
			revalidate: 3600,
		},
	});

	if (!result.ok) {
		return [];
	}

	const data = await result.json();
	return data as GitHubEvent[];
};
