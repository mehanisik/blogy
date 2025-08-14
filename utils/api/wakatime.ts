"use server";

import { env } from "@/env";
import type {
	WakaTimeAllTimeData,
	WakaTimeLanguageData,
	WakatimeStatsResponse,
	WakatimeSummariesResponse,
} from "@/types/wakatime";

export async function getWakatimeStats(
	range: string = "last_7_days",
): Promise<WakaTimeLanguageData[]> {
	try {
		if (
			!env.WAKATIME_API_KEY ||
			(process.env.NODE_ENV === "production" && !env.WAKATIME_API_KEY)
		) {
			console.warn("WakaTime API key not available, returning empty data");
			return [];
		}

		if (
			typeof process !== "undefined" &&
			process.env.NODE_ENV === "production" &&
			!env.WAKATIME_API_KEY
		) {
			return [];
		}

		const url = `https://api.wakatime.com/api/v1/users/current/stats/${range}`;
		const apiKey = env.WAKATIME_API_KEY;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 86400 },
		});

		if (!response.ok) {
			console.warn(`WakaTime API error: ${response.status}`);
			return [];
		}

		const json = (await response.json()) as WakatimeStatsResponse;
		const languagesSource = json?.data?.languages ?? [];
		const languages: WakaTimeLanguageData[] = languagesSource.map((l) => ({
			name: l.name,
			percent: l.percent,
			total_seconds: l.total_seconds,
		}));

		return languages;
	} catch (err: unknown) {
		console.warn("Failed to fetch WakaTime stats:", err);
		return [];
	}
}

export async function getWakatimeSummaries(
	start?: string,
	end?: string,
): Promise<WakatimeSummariesResponse | null> {
	try {
		if (
			!env.WAKATIME_API_KEY ||
			(process.env.NODE_ENV === "production" && !env.WAKATIME_API_KEY)
		) {
			console.warn("WakaTime API key not available, returning null");
			return null;
		}

		if (!start || !end) {
			const now = new Date();
			const endDate = now.toISOString().split("T")[0];
			const startDate = new Date(now);
			startDate.setDate(now.getDate() - 6);
			const startStr = startDate.toISOString().split("T")[0];
			start = start ?? startStr;
			end = end ?? endDate;
		}

		const apiKey = env.WAKATIME_API_KEY;

		const response = await fetch(
			`https://api.wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
			{
				method: "GET",
				headers: {
					Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
					"Content-Type": "application/json",
				},
				next: { revalidate: 86400 },
			},
		);

		if (!response.ok) {
			console.warn("Failed to fetch WakaTime summaries");
			return null;
		}

		const data = (await response.json()) as WakatimeSummariesResponse;
		return data;
	} catch (error) {
		console.warn("Failed to fetch WakaTime summaries:", error);
		return null;
	}
}

export async function getWakatimeAllTime(): Promise<WakaTimeAllTimeData | null> {
	try {
		// Check if we're in a build environment or if API key is missing
		if (
			!env.WAKATIME_API_KEY ||
			(process.env.NODE_ENV === "production" && !env.WAKATIME_API_KEY)
		) {
			console.warn("WakaTime API key not available, returning null");
			return null;
		}

		const url = `https://api.wakatime.com/api/v1/users/current/all_time_since_today`;
		const apiKey = env.WAKATIME_API_KEY;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 86400 },
		});

		if (!response.ok) {
			console.warn(`WakaTime API error: ${response.status}`);
			return null;
		}

		const raw: unknown = await response.json();
		const data: WakaTimeAllTimeData = (
			raw && typeof raw === "object" && "data" in raw
				? (raw as { data: WakaTimeAllTimeData }).data
				: (raw as WakaTimeAllTimeData)
		) as WakaTimeAllTimeData;

		return data;
	} catch (err: unknown) {
		console.warn("Failed to fetch WakaTime all-time stats:", err);
		return null;
	}
}
