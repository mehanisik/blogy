"use server";

import { env } from "@/env";
import type {
	WakaTimeAllTimeData,
	WakaTimeAllTimeResult,
	WakaTimeLanguageData,
	WakaTimeStatsResult,
	WakaTimeSummariesResult,
	WakatimeStatsResponse,
	WakatimeSummariesResponse,
} from "@/types/wakatime";

export async function getWakatimeStats(
	range = "last_7_days",
): Promise<WakaTimeStatsResult> {
	try {
		const url = `https://api.wakatime.com/api/v1/users/current/stats/${range}`;
		const apiKey = env.WAKATIME_API_KEY;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 86400 }, // Cache for 24 hours
		});

		if (!response.ok) {
			return {
				success: false,
				error: `WakaTime API error: ${response.status} ${response.statusText}`,
			};
		}

		const json = (await response.json()) as WakatimeStatsResponse;
		const languagesSource = json?.data?.languages ?? [];

		const languages: WakaTimeLanguageData[] = languagesSource.map((l) => ({
			name: l.name,
			percent: l.percent,
			total_seconds: l.total_seconds,
		}));

		return {
			success: true,
			data: languages,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

export async function getWakatimeSummaries(
	start?: string,
	end?: string,
): Promise<WakaTimeSummariesResult> {
	try {
		if (!start || !end) {
			const now = new Date();
			const endDate = now.toISOString().split("T")[0];
			const startDate = new Date(now);
			startDate.setDate(now.getDate() - 6);
			const startStr = startDate.toISOString().split("T")[0];
			start = start ?? startStr;
			end = end ?? endDate;
		}

		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(start) || !dateRegex.test(end)) {
			return {
				success: false,
				error: "Invalid date format. Use YYYY-MM-DD format.",
			};
		}

		const apiKey = env.WAKATIME_API_KEY;
		const url = `https://api.wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 86400 }, // Cache for 24 hours
		});

		if (!response.ok) {
			return {
				success: false,
				error: `WakaTime API error: ${response.status} ${response.statusText}`,
			};
		}

		const data = (await response.json()) as WakatimeSummariesResponse;

		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

export async function getWakatimeAllTime(): Promise<WakaTimeAllTimeResult> {
	try {
		const url =
			"https://api.wakatime.com/api/v1/users/current/all_time_since_today";
		const apiKey = env.WAKATIME_API_KEY;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 86400 }, // Cache for 24 hours
		});

		if (!response.ok) {
			return {
				success: false,
				error: `WakaTime API error: ${response.status} ${response.statusText}`,
			};
		}

		const raw: unknown = await response.json();

		const data: WakaTimeAllTimeData =
			raw && typeof raw === "object" && "data" in raw
				? (raw as { data: WakaTimeAllTimeData }).data
				: (raw as WakaTimeAllTimeData);

		if (!data || typeof data.total_seconds !== "number") {
			return {
				success: false,
				error: "Invalid response format from WakaTime API",
			};
		}

		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

export async function getWakatimeStatsForRange(
	days = 7,
): Promise<WakaTimeStatsResult> {
	const rangeMap: Record<number, string> = {
		1: "last_day",
		7: "last_7_days",
		30: "last_30_days",
		365: "last_year",
	};

	const range = rangeMap[days] || "last_7_days";
	return getWakatimeStats(range);
}
