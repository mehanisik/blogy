import { Calendar, GitBranch, Github, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { GitHubEvent, GitHubRepo, GitHubUser } from "@/types/github";

interface GitHubCardProps {
	user: GitHubUser | null;
	repos: GitHubRepo[];
	activity: GitHubEvent[];
}

export function GitHubCard({ user, repos, activity }: GitHubCardProps) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const getEventDescription = (event: GitHubEvent) => {
		switch (event.type) {
			case "PushEvent":
				return `Pushed ${event.payload.size || 0} commits to ${event.repo.name}`;
			case "CreateEvent":
				return `Created ${event.payload.ref_type || "repository"} in ${event.repo.name}`;
			case "ForkEvent":
				return `Forked ${event.repo.name}`;
			case "WatchEvent":
				return `Starred ${event.repo.name}`;
			default:
				return `${event.type} in ${event.repo.name}`;
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Github className="h-4 w-4 sm:h-5 sm:w-5" />
					<h2 className="text-lg sm:text-xl font-semibold">GitHub Activity</h2>
				</div>
				{user && (
					<p className="text-xs sm:text-sm text-muted-foreground">
						@{user.login} • {user.public_repos} repos
					</p>
				)}
			</CardHeader>
			<CardContent className="space-y-4 sm:space-y-6">
				{user && (
					<div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
						<div>
							<p className="text-lg sm:text-2xl font-bold">{user.public_repos}</p>
							<p className="text-xs text-muted-foreground">Repositories</p>
						</div>
						<div>
							<p className="text-lg sm:text-2xl font-bold">{user.followers}</p>
							<p className="text-xs text-muted-foreground">Followers</p>
						</div>
						<div>
							<p className="text-lg sm:text-2xl font-bold">{user.following}</p>
							<p className="text-xs text-muted-foreground">Following</p>
						</div>
					</div>
				)}

				<div>
					<div className="flex items-center gap-2 mb-2 sm:mb-3">
						<GitBranch className="h-3 w-3 sm:h-4 sm:w-4" />
						<h3 className="text-sm sm:text-base font-medium">Recent Repositories</h3>
					</div>
					<div className="space-y-2 sm:space-y-3">
						{repos.slice(0, 5).map((repo) => (
							<div key={repo.id} className="flex items-center justify-between">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2">
										<a
											href={repo.html_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs sm:text-sm font-medium hover:underline truncate"
										>
											{repo.name}
										</a>
										{repo.private && <Badge variant="outline" className="text-xs">Private</Badge>}
									</div>
									{repo.description && (
										<p className="text-xs text-muted-foreground truncate">
											{repo.description}
										</p>
									)}
									<div className="flex items-center gap-2 sm:gap-4 mt-1">
										{repo.language && (
											<span className="text-xs text-muted-foreground">
												{repo.language}
											</span>
										)}
										<div className="flex items-center gap-1">
											<Star className="h-2 w-2 sm:h-3 sm:w-3" />
											<span className="text-xs">{repo.stargazers_count}</span>
										</div>
										<div className="flex items-center gap-1">
											<GitBranch className="h-2 w-2 sm:h-3 sm:w-3" />
											<span className="text-xs">{repo.forks_count}</span>
										</div>
									</div>
								</div>
								<div className="text-xs text-muted-foreground">
									{formatDate(repo.updated_at)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2 sm:mb-3">
						<Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
						<h3 className="text-sm sm:text-base font-medium">Recent Activity</h3>
					</div>
					<div className="space-y-1 sm:space-y-2">
						{activity.slice(0, 5).map((event) => (
							<div key={event.id} className="flex items-start justify-between">
								<div className="flex-1 min-w-0">
									<p className="text-xs sm:text-sm">{getEventDescription(event)}</p>
								</div>
								<div className="text-xs text-muted-foreground ml-2">
									{formatDate(event.created_at)}
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
