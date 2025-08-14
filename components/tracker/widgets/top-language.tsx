import { Code } from "lucide-react";
import { Suspense } from "react";
import WakaTimeError from "@/components/tracker/wakatime-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWakatimeStats } from "@/utils/api/wakatime";
import { TopLanguageLoading } from "../loaders";

export default async function TopLanguage() {
	const languages = await getWakatimeStats();

	return (
		<Suspense fallback={<TopLanguageLoading />}>
			<Card className="group relative overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs sm:text-sm font-medium">
						Top Language (7d)
					</CardTitle>
					<Code className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					{languages ? (
						<>
							<div className="text-xl font-bold">
								{languages[0]?.name || "N/A"}
							</div>
							<p className="text-xs text-muted-foreground">
								{languages[0]?.percent != null
									? languages[0]?.percent.toFixed(1)
									: "N/A"}
								% of time
							</p>
						</>
					) : (
						<WakaTimeError message="No data available" />
					)}
				</CardContent>
			</Card>
		</Suspense>
	);
}
