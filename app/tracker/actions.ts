"use server";

import { env } from "@/env";
import type {
	WakatimeStatsResponse,
	WakatimeSummariesResponse,
} from "@/types/wakatime";

const WAKATIME_BASE_URL = "https://api.wakatime.com/api/v1";
const WAKATIME_API_KEY = env.WAKATIME_API_KEY;
const CACHE_DURATION = 3600; // 1 hour

export async function getWakatimeStats(
	range:
		| "last_7_days"
		| "last_30_days"
		| "last_6_months"
		| "last_year"
		| "all_time",
): Promise<WakatimeStatsResponse | null> {
	try {
		const response = await fetch(
			`${WAKATIME_BASE_URL}/users/current/stats/${range}`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
				},
				next: { revalidate: CACHE_DURATION },
			},
		);

		if (!response.ok) {
			console.warn(
				`WakaTime API error: ${response.status} ${response.statusText}`,
			);
			return null;
		}

		const data = (await response.json()) as WakatimeStatsResponse;
		return data;
	} catch (error) {
		console.warn("WakaTime API error:", error);
		return null;
	}
}

export async function getWakatimeSummaries(
	range:
		| "last_7_days"
		| "last_30_days"
		| "last_6_months"
		| "last_year" = "last_7_days",
): Promise<WakatimeSummariesResponse | null> {
	try {
		const response = await fetch(
			`${WAKATIME_BASE_URL}/users/current/summaries?range=${range}`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
				},
				next: { revalidate: CACHE_DURATION },
			},
		);

		if (!response.ok) {
			console.warn(
				`WakaTime API error: ${response.status} ${response.statusText}`,
			);
			return null;
		}

		const data = (await response.json()) as WakatimeSummariesResponse;
		return data;
	} catch (error) {
		console.warn("WakaTime API error:", error);
		return null;
	}
}
