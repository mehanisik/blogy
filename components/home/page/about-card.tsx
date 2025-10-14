import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubProfile } from "./github-profile";

export function AboutCard({ username }: { username: string }) {
	return (
		<Card className="relative col-span-1 row-span-2 overflow-hidden border border-dashed bg-card md:col-span-2">
			<CardHeader>
				<Suspense
					fallback={
						<div className="mb-6">
							<div className="h-16 w-16 animate-pulse rounded-md border border-border bg-muted" />
						</div>
					}
				>
					<GitHubProfile username={username} />
				</Suspense>
				<CardTitle className="text-base font-semibold text-foreground">
					About
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-grow flex-col justify-between">
				<div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Recent master's graduate in Computer Science with a passion for
						software development and building modern web applications.
					</p>

					<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
						I specialize in the React ecosystem and love exploring cutting-edge
						technologies, infrastructure, and distributed systems.
					</p>

					<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
						When I'm not coding, you'll find me playing chess, reading books, or
						enjoying nature's tranquility.
					</p>
				</div>
				<div className="mt-8 flex flex-wrap gap-3">
					<span className="border border-border px-3 py-1 text-xs text-foreground">
						React
					</span>
					<span className="border border-border px-3 py-1 text-xs text-foreground">
						TypeScript
					</span>
					<span className="border border-border px-3 py-1 text-xs text-foreground">
						Next.js
					</span>
					<span className="border border-border px-3 py-1 text-xs text-foreground">
						Node.js
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
