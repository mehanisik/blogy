"use server";

import type { GitHubEvent } from "@/types/github";

const GITHUB_BASE_URL = "https://api.github.com";
const REVALIDATE_TIME = 3600; // 1 hour

export async function getGithubActivities(): Promise<GitHubEvent[] | null> {
	try {
		const res = await fetch(`${GITHUB_BASE_URL}/users/mehanisik/events`, {
			headers: {
				"Content-Type": "application/json",
			},
			cache: "force-cache",
			next: {
				revalidate: REVALIDATE_TIME,
			},
		});

		if (!res.ok) {
			console.warn(`GitHub API error: ${res.status} ${res.statusText}`);
			return null;
		}

		return res.json() as Promise<GitHubEvent[]>;
	} catch (error) {
		console.warn("GitHub API error:", error);
		return null;
	}
}
