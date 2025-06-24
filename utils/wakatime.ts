import type { WakaTimeStats, WakaTimeSummary } from "@/types/wakatime";
import env from "./env";

export async function getWakaTimeStats(): Promise<WakaTimeStats | null> {

	try {
		const response = await fetch(
			"https://wakatime.com/api/v1/users/current/stats/last_7_days",
			{
				headers: {
					Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY || "").toString("base64")}`,
				},
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("WakaTime API error response:", errorText);
			throw new Error(`WakaTime API error: ${response.status} - ${errorText}`);
		}

		const data = await response.json();

		if (!data || typeof data !== "object") {
			console.error("WakaTime API returned invalid data structure:", data);
			return null;
		}

		return data as WakaTimeStats;
	} catch (error) {
		console.error("Failed to fetch WakaTime stats:", error);
		return null;
	}
}

export async function getWakaTimeSummary(
	days: number = 7,
): Promise<WakaTimeSummary | null> {
	if (!env.WAKATIME_API_KEY) {
		return null;
	}

	try {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - days);

		const response = await fetch(
			`https://wakatime.com/api/v1/users/current/summaries?start=${startDate.toISOString().split("T")[0]}&end=${endDate.toISOString().split("T")[0]}`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString("base64")}`,
				},
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) {
			throw new Error(`WakaTime API error: ${response.status}`);
		}

		return (await response.json()) as WakaTimeSummary;
	} catch (error) {
		console.error("Failed to fetch WakaTime summary:", error);
		return null;
	}
}
