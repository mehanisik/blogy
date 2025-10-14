import { getGitHubActivity } from "@/app/actions/github";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface Activity {
	id: string;
	action: string;
	repo: string;
	time: Date;
}

function getTimeAgo(date: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return "just now";
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
	return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export async function GitHubActivity({ username }: { username: string }) {
	const activities: Activity[] = await getGitHubActivity(username);

	if (activities.length === 0) {
		return (
			<div>
				<p className="text-xs text-muted-foreground">No recent activity</p>
			</div>
		);
	}

	return (
		<TooltipProvider>
			<div className="space-y-3">
				{activities.slice(0, 4).map((activity) => (
					<div
						key={activity.id}
						className="flex w-full items-center justify-between text-xs"
					>
						<p className="truncate text-foreground">
							<span className="text-muted-foreground">
								{activity.action} on
							</span>{" "}
							<span className="font-medium">{activity.repo}</span>
						</p>
						<Tooltip>
							<TooltipTrigger>
								<span className="flex-shrink-0 cursor-default text-muted-foreground/80">
									{getTimeAgo(activity.time)}
								</span>
							</TooltipTrigger>
							<TooltipContent>
								<p>{new Date(activity.time).toUTCString()}</p>
							</TooltipContent>
						</Tooltip>
					</div>
				))}
			</div>
		</TooltipProvider>
	);
}
