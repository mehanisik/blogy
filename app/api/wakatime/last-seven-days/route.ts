import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/env";
import type { WakatimeSummariesResponse } from "@/types/wakatime";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	let start = searchParams.get("start");
	let end = searchParams.get("end");

	if (!start || !end) {
		const now = new Date();
		const endDate = now.toISOString().split("T")[0];
		const startDate = new Date(now);
		startDate.setDate(now.getDate() - 6);
		const startStr = startDate.toISOString().split("T")[0];
		start = start ?? startStr;
		end = end ?? endDate;
	}

	try {
		const apiKey = env.NEXT_PUBLIC_WAKATIME_API_KEY;
		if (!apiKey) {
			return NextResponse.json(
				{ error: "Wakatime API key not configured" },
				{ status: 500 },
			);
		}

		const response = await fetch(
			`https://api.wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
				},
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) {
			throw new Error("Failed to fetch Wakatime summaries");
		}

		const data = (await response.json()) as WakatimeSummariesResponse;
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch coding summaries", message: error },
			{ status: 500 },
		);
	}
}
