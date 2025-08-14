"use server";

import type { GitHubEvent } from "@/types/github";

const GITHUB_BASE_URL = "https://api.github.com";
const REVALIDATE_TIME = 3600 * 3; // 3 hours

export async function getGithubActivities() {
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
		throw new Error("Failed to fetch Github activities");
	}

	return res.json() as Promise<GitHubEvent[]>;
}
