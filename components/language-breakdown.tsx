import { Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { WakaTimeStats } from "@/types/wakatime";

interface LanguageBreakdownProps {
	stats: WakaTimeStats;
}

export function LanguageBreakdown({ stats }: LanguageBreakdownProps) {
	const data = stats.data;

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
	};

	const getLanguageColor = (language: string) => {
		const colors: Record<string, string> = {
			TypeScript: "bg-blue-500",
			JavaScript: "bg-yellow-500",
			Python: "bg-green-500",
			Java: "bg-red-500",
			"C++": "bg-purple-500",
			"C#": "bg-purple-600",
			Go: "bg-cyan-500",
			Rust: "bg-orange-500",
			PHP: "bg-indigo-500",
			Ruby: "bg-red-600",
			Swift: "bg-orange-600",
			Kotlin: "bg-purple-700",
			CSS: "bg-pink-500",
			HTML: "bg-orange-400",
			Markdown: "bg-gray-500",
			JSON: "bg-yellow-600",
			SQL: "bg-blue-600",
			Shell: "bg-green-600",
			Other: "bg-gray-400",
		};

		return colors[language] || "bg-gray-500";
	};

	if (!data.languages || data.languages.length === 0) {
		return (
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Code className="h-5 w-5" />
						<h2 className="text-xl font-semibold">Languages</h2>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-center py-8">
						No language data available
					</p>
				</CardContent>
			</Card>
		);
	}

	const topLanguages = data.languages.slice(0, 5);

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Code className="h-5 w-5" />
					<h2 className="text-xl font-semibold">Languages</h2>
				</div>
				<p className="text-sm text-muted-foreground">
					Top programming languages used this week
				</p>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="space-y-3">
						{topLanguages.map((language) => (
							<div key={language.name} className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div
											className={`w-3 h-3 rounded-full ${getLanguageColor(language.name)}`}
										/>
										<span className="text-sm font-medium">{language.name}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-xs text-muted-foreground">
											{formatTime(language.total_seconds)}
										</span>
										<Badge variant="secondary" className="text-xs">
											{language.percent}%
										</Badge>
									</div>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div
										className={`h-2 rounded-full ${getLanguageColor(language.name)} transition-all duration-300`}
										style={{ width: `${language.percent}%` }}
									/>
								</div>
							</div>
						))}
					</div>

					<div className="grid grid-cols-2 gap-4 pt-4 border-t">
						<div className="text-center">
							<p className="text-lg font-bold text-primary">
								{topLanguages.length}
							</p>
							<p className="text-xs text-muted-foreground">Languages Used</p>
						</div>
						<div className="text-center">
							<p className="text-lg font-bold text-primary">
								{topLanguages[0]?.name || "N/A"}
							</p>
							<p className="text-xs text-muted-foreground">Most Used</p>
						</div>
					</div>

					{data.languages.length > 5 && (
						<div className="pt-4 border-t">
							<p className="text-sm font-medium mb-2">Other Languages</p>
							<div className="flex flex-wrap gap-2">
								{data.languages.slice(5).map((language) => (
									<Badge
										key={language.name}
										variant="outline"
										className="text-xs"
									>
										{language.name} ({language.percent}%)
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
