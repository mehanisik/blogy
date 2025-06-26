import { env } from "@/env";
import type {
	WakaTimeAllTimeData,
	WakaTimeLanguageData,
	WakaTimeLastSevenDaysData,
} from "@/types/wakatime";

const API_KEY = env.WAKATIME_API_KEY;
const BASE_URL = "https://wakatime.com/api/v1";

const CACHE_DURATION = 60 * 60 * 1000;

let summaryCache: {
	timestamp: number;
	data: WakaTimeAllTimeData;
} | null = null;

let languagesCache: {
	timestamp: number;
	data: WakaTimeLanguageData[];
} | null = null;

let lastSevenDaysCache: {
	timestamp: number;
	data: WakaTimeLastSevenDaysData;
} | null = null;

export async function getWakaTimeSummary() {
	try {
		if (summaryCache && Date.now() - summaryCache.timestamp < CACHE_DURATION) {
			return summaryCache.data;
		}

		const response = await fetch(
			`${BASE_URL}/users/current/all_time_since_today`,
			{
				headers: {
					Authorization: `Basic ${btoa(API_KEY as string)}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch WakaTime summary: ${response.statusText}`,
			);
		}

		const { data } = (await response.json()) as { data: WakaTimeAllTimeData };

		summaryCache = {
			timestamp: Date.now(),
			data,
		};

		return data;
	} catch (error) {
		throw new Error(
			`Failed to fetch WakaTime summary: ${
				error instanceof Error ? error.message : "Unknown error"
			}`,
		);
	}
}

export async function getWakaTimeLanguages() {
	try {
		if (
			languagesCache &&
			Date.now() - languagesCache.timestamp < CACHE_DURATION
		) {
			return languagesCache.data;
		}
		const response = await fetch(
			`${BASE_URL}/users/current/stats/last_7_days`,
			{
				headers: {
					Authorization: `Basic ${btoa(API_KEY as string)}`,
				},
			},
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch WakaTime languages: ${response.statusText}`,
			);
		}
		const json = (await response.json()) as {
			data: { languages: WakaTimeLanguageData[] };
		};
		languagesCache = {
			timestamp: Date.now(),
			data: json.data.languages,
		};
		return json.data.languages;
	} catch (error) {
		throw new Error(
			`Failed to fetch WakaTime languages: ${
				error instanceof Error ? error.message : "Unknown error"
			}`,
		);
	}
}

export async function getWakaTimeLastSevenDays() {
	try {
		if (
			lastSevenDaysCache &&
			Date.now() - lastSevenDaysCache.timestamp < CACHE_DURATION
		) {
			return lastSevenDaysCache.data;
		}
		const today = new Date();
		const startDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - 6,
		);

		const formattedStartDate = `${startDate.getFullYear()}-${String(
			startDate.getMonth() + 1,
		).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
		const formattedTodayDate = `${today.getFullYear()}-${String(
			today.getMonth() + 1,
		).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

		const response = await fetch(
			`${BASE_URL}/users/current/summaries?start=${formattedStartDate}&end=${formattedTodayDate}`,
			{
				headers: {
					Authorization: `Basic ${btoa(API_KEY as string)}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch WakaTime last 7 days: ${response.statusText}`,
			);
		}

		const json = (await response.json()) as {
			data: {
				grand_total: { total_seconds: number };
				range: { date: string };
			}[];
		};

		const dailyData = json.data.map((day) => ({
			date: day.range.date,
			hours: parseFloat((day.grand_total.total_seconds / 3600).toFixed(2)),
		}));

		const totalSeconds = dailyData.reduce(
			(acc, day) => acc + day.hours * 3600,
			0,
		);
		const dailyAverage = totalSeconds / 3600 / dailyData.length;

		const result = {
			days: dailyData,
			daily_average: dailyAverage,
			total_seconds: totalSeconds,
		} as WakaTimeLastSevenDaysData;

		lastSevenDaysCache = {
			timestamp: Date.now(),
			data: result,
		};

		return result;
	} catch (error) {
		throw new Error(
			`Failed to fetch WakaTime last 7 days: ${
				error instanceof Error ? error.message : "Unknown error"
			}`,
		);
	}
}
