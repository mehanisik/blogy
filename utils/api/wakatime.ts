import { env } from "@/env";
import type {
	WakaTimeAllTimeData,
	WakaTimeLanguageData,
	WakatimeStatsResponse,
	WakatimeSummariesResponse,
} from "@/types/wakatime";

const WAKATIME_API_URL = "https://api.wakatime.com/api/v1";

export async function fetchWakatimeSummary() {
	try {
		console.log("Fetching Wakatime summary...");

		if (!env.WAKATIME_API_KEY) {
			console.error("WAKATIME_API_KEY environment variable is not set");
			return null;
		}

		const response = await fetch(
			"https://api.wakatime.com/api/v1/users/current/all_time_since_today",
			{
				headers: {
					Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString("base64")}`,
				},
				next: { revalidate: 86400 }, // Cache for 24 hours
			},
		);

		console.log("Wakatime API response status:", response.status);

		if (!response.ok) {
			console.warn(`WakaTime API error: ${response.status}`);
			return null;
		}

		const data = (await response.json()) as WakaTimeAllTimeData;
		console.log("Wakatime API response data:", data);

		if (!data || typeof data.total_seconds !== "number") {
			console.warn("WakaTime API returned unexpected data structure:", data);

			const fallbackResponse = await fetch(
				"https://api.wakatime.com/api/v1/users/current/stats/all_time",
				{
					headers: {
						Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString("base64")}`,
					},
					next: { revalidate: 86400 },
				},
			);

			if (fallbackResponse.ok) {
				const fallbackData = (await fallbackResponse.json()) as any;
				console.log("Fallback endpoint data:", fallbackData);

				if (
					fallbackData.data &&
					typeof fallbackData.data.total_seconds === "number"
				) {
					return {
						total_seconds: fallbackData.data.total_seconds,
						daily_average: fallbackData.data.daily_average || 0,
						range: {
							start_date: fallbackData.data.start || new Date().toISOString(),
							end_date: fallbackData.data.end || new Date().toISOString(),
							start: fallbackData.data.start || new Date().toISOString(),
							end: fallbackData.data.end || new Date().toISOString(),
							start_text: fallbackData.data.start || "Unknown",
							end_text: fallbackData.data.end || "Unknown",
							timezone: "UTC",
						},
						decimal: fallbackData.data.human_readable_total || "0",
						digital: fallbackData.data.human_readable_total || "0",
						text: fallbackData.data.human_readable_total || "0",
						percent_calculated: 100,
						is_up_to_date: true,
						timeout: 0,
					} as WakaTimeAllTimeData;
				}
			}

			return null;
		}

		return data;
	} catch (error) {
		console.error("Failed to fetch Wakatime all-time stats:", error);
		return null;
	}
}

export async function fetchWakatimeLanguages() {
	try {
		if (!env.WAKATIME_API_KEY) {
			console.error("WAKATIME_API_KEY environment variable is not set");
			return null;
		}

		const response = await fetch(
			`${WAKATIME_API_URL}/users/current/stats/last_7_days`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString("base64")}`,
				},
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) {
			console.warn(`WakaTime API error: ${response.status}`);
			return null;
		}

		const data = (await response.json()) as {
			data?: { languages?: WakaTimeLanguageData[] };
		};
		return data.data?.languages || [];
	} catch (error) {
		console.error("Failed to fetch WakaTime languages:", error);
		return null;
	}
}

export async function fetchWakatimeLastSevenDays() {
	try {
		if (!env.WAKATIME_API_KEY) {
			console.error("WAKATIME_API_KEY environment variable is not set");
			return null;
		}

		const response = await fetch(
			`https://api.wakatime.com/api/v1/users/current/stats/last_7_days`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString("base64")}`,
				},
				next: { revalidate: 86400 }, // Cache for 24 hours
			},
		);

		if (!response.ok) {
			console.warn(`WakaTime API error: ${response.status}`);
			return null;
		}

		const data = (await response.json()) as WakatimeStatsResponse;
		return data;
	} catch (error) {
		console.error("Failed to fetch Wakatime stats:", error);
		return null;
	}
}

export async function fetchWakatimeSummaries() {
	try {
		if (!env.WAKATIME_API_KEY) {
			console.error("WAKATIME_API_KEY environment variable is not set");
			return null;
		}

		const response = await fetch(
			`https://api.wakatime.com/api/v1/users/current/summaries?range=last_7_days`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString("base64")}`,
				},
				next: { revalidate: 86400 },
			},
		);

		if (!response.ok) {
			console.warn(`WakaTime API error: ${response.status}`);
			return null;
		}

		const data = (await response.json()) as WakatimeSummariesResponse;
		return data;
	} catch (error) {
		console.error("Failed to fetch Wakatime summaries:", error);
		return null;
	}
}
