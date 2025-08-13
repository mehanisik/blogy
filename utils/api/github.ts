"use server";
import type { GitHubEvent } from "@/types/github";
import { getBaseUrl } from "@/utils/helpers/get-base-url";

export const getGithubActivities = async () => {
	const response = await fetch(`${getBaseUrl()}/api/github/activities`, {
		next: { revalidate: 3600 },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch GitHub activities");
	}
	return (await response.json()) as GitHubEvent[];
};
