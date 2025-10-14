import Image from "next/image";
import { getGitHubStats } from "@/app/actions/github";

export async function GitHubProfile({ username }: { username: string }) {
	const stats = await getGitHubStats(username);

	if (!stats) {
		return null;
	}

	return (
		<div className="mb-6 flex items-start gap-4">
			<div className="relative h-16 w-16 overflow-hidden border border-border">
				<Image
					src={stats.avatar || "/placeholder.svg"}
					alt={stats.name || username}
					fill
					className="object-cover"
				/>
			</div>
			<div className="flex-1">
				<h2 className="text-base font-medium text-card-foreground">
					{stats.name || username}
				</h2>
				{stats.bio && (
					<p className="mt-1 text-xs text-muted-foreground">{stats.bio}</p>
				)}
			</div>
		</div>
	);
}
