import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubActivity } from "./github-activity";

export function RecentActivityCard({ username }: { username: string }) {
	return (
		<Card className="relative col-span-1 row-span-1 overflow-hidden border border-dashed bg-card">
			<CardHeader>
				<CardTitle className="text-base font-semibold text-foreground">
					Recent Activity
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Suspense
					fallback={
						<div className="space-y-2">
							<p className="text-xs text-muted-foreground">Loading...</p>
						</div>
					}
				>
					<GitHubActivity username={username} />
				</Suspense>
			</CardContent>
		</Card>
	);
}
