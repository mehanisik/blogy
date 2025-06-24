import type { GitHubEvent, GitHubRepo, GitHubUser } from "@/types/github";
import env from "./env";

export async function getGitHubUser(): Promise<GitHubUser | null> {
	if (!env.GITHUB_TOKEN || !env.GITHUB_USERNAME) {
		return null;
	}

	try {
		const response = await fetch(
			`https://api.github.com/users/${env.GITHUB_USERNAME}`,
			{
				headers: {
					Authorization: `Bearer ${env.GITHUB_TOKEN}`,
					"User-Agent": "blogy-app",
				},
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		return (await response.json()) as GitHubUser;
	} catch (error) {
		console.error("Failed to fetch GitHub user:", error);
		return null;
	}
}

export async function getGitHubRepos(
	limit: number = 10,
): Promise<GitHubRepo[]> {
	if (!env.GITHUB_TOKEN || !env.GITHUB_USERNAME) {
		return [];
	}

	try {
		const response = await fetch(
			`https://api.github.com/users/${env.GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${env.GITHUB_TOKEN}`,
					"User-Agent": "blogy-app",
				},
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		return (await response.json()) as GitHubRepo[];
	} catch (error) {
		console.error("Failed to fetch GitHub repos:", error);
		return [];
	}
}

export async function getGitHubActivity(
	limit: number = 10,
): Promise<GitHubEvent[]> {
	if (!env.GITHUB_TOKEN || !env.GITHUB_USERNAME) {
		return [];
	}

	try {
		const response = await fetch(
			`https://api.github.com/users/${env.GITHUB_USERNAME}/events?per_page=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${env.GITHUB_TOKEN}`,
					"User-Agent": "blogy-app",
				},
				next: { revalidate: 1800 },
			},
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		return (await response.json()) as GitHubEvent[];
	} catch (error) {
		console.error("Failed to fetch GitHub activity:", error);
		return [];
	}
}
