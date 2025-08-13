import { NextResponse } from "next/server";
import { env } from "@/env";
import type { WakaTimeAllTimeData } from "@/types/wakatime";

export async function GET() {
	try {
		const url = `https://api.wakatime.com/api/v1/users/current/all_time_since_today`;
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
		const raw: unknown = await res.json();
		const data: WakaTimeAllTimeData = (
			raw && typeof raw === "object" && "data" in raw
				? (raw as { data: WakaTimeAllTimeData }).data
				: (raw as WakaTimeAllTimeData)
		) as WakaTimeAllTimeData;
		return NextResponse.json(data);
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Unknown error" },
			{ status: 500 },
		);
	}
}
