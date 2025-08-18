"use server";

import type { GitHubReadmeResponse, GitHubRepository } from "@/types/github";

const GITHUB_BASE_URL = "https://api.github.com";
const REVALIDATE_TIME = 3600; // 1 hour

/**
 * Extract owner and repo name from a GitHub URL
 * @param githubUrl - GitHub repository URL (e.g., "https://github.com/owner/repo")
 * @returns Object with owner and repo, or null if invalid
 */
function parseGithubUrl(
	githubUrl: string,
): { owner: string; repo: string } | null {
	try {
		const url = new URL(githubUrl);
		if (url.hostname !== "github.com") return null;

		const pathParts = url.pathname.split("/").filter(Boolean);
		if (pathParts.length < 2) return null;

		return {
			owner: pathParts[0],
			repo: pathParts[1],
		};
	} catch {
		return null;
	}
}

/**
 * Fetch README.md content from a GitHub repository
 * @param owner - Repository owner/organization
 * @param repo - Repository name
 * @returns README content as markdown string, or null if not found
 */
export async function getGithubReadme(
	owner: string,
	repo: string,
): Promise<string | null> {
	try {
		const headers: Record<string, string> = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "blogy-app",
		};

		const response = await fetch(
			`${GITHUB_BASE_URL}/repos/${owner}/${repo}/readme`,
			{
				headers,
				cache: "force-cache",
				next: {
					revalidate: REVALIDATE_TIME,
				},
			},
		);

		if (!response.ok) {
			if (response.status === 404) {
				console.warn(`README not found for ${owner}/${repo}`);
				return null;
			}
			throw new Error(
				`GitHub API error: ${response.status} ${response.statusText}`,
			);
		}

		const data = (await response.json()) as GitHubReadmeResponse;

		// Decode base64 content
		const readmeContent = Buffer.from(data.content, "base64").toString("utf-8");
		return readmeContent;
	} catch (error) {
		console.error(`Error fetching README for ${owner}/${repo}:`, error);
		return null;
	}
}

/**
 * Fetch README content from a GitHub repository URL
 * @param githubUrl - Full GitHub repository URL
 * @returns README content as markdown string, or null if not found/invalid
 */
export async function getGithubReadmeFromUrl(
	githubUrl: string,
): Promise<string | null> {
	const parsed = parseGithubUrl(githubUrl);
	if (!parsed) {
		console.warn(`Invalid GitHub URL: ${githubUrl}`);
		return null;
	}

	return getGithubReadme(parsed.owner, parsed.repo);
}

/**
 * Fetch repository information from GitHub
 * @param owner - Repository owner/organization
 * @param repo - Repository name
 * @returns Repository information or null if not found
 */
export async function getGithubRepository(
	owner: string,
	repo: string,
): Promise<GitHubRepository | null> {
	try {
		const headers: Record<string, string> = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "blogy-app",
		};

		const response = await fetch(`${GITHUB_BASE_URL}/repos/${owner}/${repo}`, {
			headers,
			cache: "force-cache",
			next: {
				revalidate: REVALIDATE_TIME,
			},
		});

		if (!response.ok) {
			if (response.status === 404) {
				console.warn(`Repository not found: ${owner}/${repo}`);
				return null;
			}
			throw new Error(
				`GitHub API error: ${response.status} ${response.statusText}`,
			);
		}

		return response.json() as Promise<GitHubRepository>;
	} catch (error) {
		console.error(`Error fetching repository ${owner}/${repo}:`, error);
		return null;
	}
}

/**
 * Fetch repository information from GitHub URL
 * @param githubUrl - Full GitHub repository URL
 * @returns Repository information or null if not found/invalid
 */
export async function getGithubRepositoryFromUrl(
	githubUrl: string,
): Promise<GitHubRepository | null> {
	const parsed = parseGithubUrl(githubUrl);
	if (!parsed) {
		console.warn(`Invalid GitHub URL: ${githubUrl}`);
		return null;
	}

	return getGithubRepository(parsed.owner, parsed.repo);
}
