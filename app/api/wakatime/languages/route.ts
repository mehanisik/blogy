import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import type {
	WakaTimeLanguageData,
	WakatimeStatsResponse,
} from "@/types/wakatime";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const range = searchParams.get("range") || "last_7_days";
		const url = `https://api.wakatime.com/api/v1/users/current/stats/${range}`;
		const apiKey = env.WAKATIME_API_KEY;
		if (!apiKey) {
			return NextResponse.json(
				{ error: "Wakatime API key not configured" },
				{ status: 500 },
			);
		}
		const res = await fetch(url, {
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
			},
			next: { revalidate: 3600 },
		});
		if (!res.ok) {
			return NextResponse.json(
				{ error: `Request failed with status ${res.status}` },
				{ status: res.status },
			);
		}

		const json: WakatimeStatsResponse =
			(await res.json()) as WakatimeStatsResponse;
		const languagesSource = json?.data?.languages ?? [];
		const languages: WakaTimeLanguageData[] = languagesSource.map((l) => ({
			name: l.name,
			percent: l.percent,
			total_seconds: l.total_seconds,
		}));
		return NextResponse.json(languages satisfies WakaTimeLanguageData[]);
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Unknown error" },
			{ status: 500 },
		);
	}
}
