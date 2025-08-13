"use server";

import type {
	WakaTimeAllTimeData,
	WakaTimeLanguageData,
	WakatimeSummariesResponse,
} from "@/types/wakatime";
import { getBaseUrl } from "@/utils/helpers/get-base-url";

export async function fetchWakatimeSummary() {
	const response = await fetch(`${getBaseUrl()}/api/wakatime/summary`, {
		next: { revalidate: 3600 },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch WakaTime summary");
	}
	return (await response.json()) as WakaTimeAllTimeData;
}

export async function fetchWakatimeLanguages() {
	const response = await fetch(`${getBaseUrl()}/api/wakatime/languages`, {
		next: { revalidate: 3600 },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch WakaTime languages");
	}
	return (await response.json()) as WakaTimeLanguageData[];
}

export async function fetchWakatimeLastSevenDays() {
	const response = await fetch(`${getBaseUrl()}/api/wakatime/last-seven-days`, {
		next: { revalidate: 3600 },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch WakaTime last seven days");
	}
	return (await response.json()) as WakatimeSummariesResponse;
}
