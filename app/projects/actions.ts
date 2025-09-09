"use server";

const _GITHUB_BASE_URL = "https://api.github.com";
const _REVALIDATE_TIME = 3600; // 1 hour

function _parseGithubUrl(
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
