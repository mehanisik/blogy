"use server";

interface GitHubEvent {
	id: string;
	type: string;
	repo: {
		name: string;
	};
	created_at: string;
	payload: {
		commits?: Array<{ message: string }>;
		action?: string;
		ref_type?: string;
	};
}

interface GitHubUser {
	name: string;
	bio: string;
	public_repos: number;
	followers: number;
	avatar_url: string;
	location: string;
}

interface GitHubRepo {
	stargazers_count: number;
}

export async function getGitHubActivity(username: string) {
	try {
		const response = await fetch(
			`https://api.github.com/users/${username}/events/public?per_page=5`,
			{
				next: { revalidate: 300 }, // Cache for 5 minutes
			},
		);

		if (!response.ok) {
			throw new Error("Failed to fetch GitHub activity");
		}

		const events: GitHubEvent[] = await response.json();

		return events.map((event) => {
			let action = "";
			switch (event.type) {
				case "PushEvent": {
					const commitCount = event.payload.commits?.length || 0;
					action = `Pushed ${commitCount} commit${commitCount !== 1 ? "s" : ""}`;
					break;
				}
				case "CreateEvent":
					action = `Created ${event.payload.ref_type || "repository"}`;
					break;
				case "PullRequestEvent":
					action = `${event.payload.action} pull request`;
					break;
				case "IssuesEvent":
					action = `${event.payload.action} issue`;
					break;
				case "WatchEvent":
					action = "Starred repository";
					break;
				case "ForkEvent":
					action = "Forked repository";
					break;
				default:
					action = event.type.replace("Event", "");
			}

			return {
				id: event.id,
				action,
				repo: event.repo.name,
				time: new Date(event.created_at),
			};
		});
	} catch (error) {
		console.error("Error fetching GitHub activity:", error);
		return [];
	}
}

export async function getGitHubStats(username: string) {
	try {
		const [userResponse, reposResponse] = await Promise.all([
			fetch(`https://api.github.com/users/${username}`, {
				next: { revalidate: 3600 }, // Cache for 1 hour
			}),
			fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
				next: { revalidate: 3600 },
			}),
		]);

		if (!userResponse.ok || !reposResponse.ok) {
			throw new Error("Failed to fetch GitHub stats");
		}

		const user: GitHubUser = await userResponse.json();
		const repos = await reposResponse.json();

		// Calculate total stars
		const totalStars = repos.reduce(
			(acc: number, repo: GitHubRepo) => acc + repo.stargazers_count,
			0,
		);

		// Get contribution count for current year (approximate from recent activity)
		const eventsResponse = await fetch(
			`https://api.github.com/users/${username}/events/public?per_page=100`,
			{
				next: { revalidate: 3600 },
			},
		);
		const events = eventsResponse.ok ? await eventsResponse.json() : [];
		const currentYear = new Date().getFullYear();
		const thisYearEvents = events.filter(
			(event: GitHubEvent) =>
				new Date(event.created_at).getFullYear() === currentYear,
		);

		return {
			name: user.name,
			bio: user.bio,
			avatar: user.avatar_url,
			location: user.location,
			publicRepos: user.public_repos,
			followers: user.followers,
			totalStars,
			contributions: thisYearEvents.length * 3, // Rough estimate
		};
	} catch (error) {
		console.error("Error fetching GitHub stats:", error);
		return null;
	}
}
