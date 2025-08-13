import { NextResponse } from "next/server";
import type { GitHubEvent } from "@/types/github";

export async function GET() {
	try {
		const url = `https://api.github.com/users/mehanisik/events/public`;
		const res = await fetch(url);

		if (!res.ok) {
			const errorText = await res.text();

			return NextResponse.json(
				{
					error: "Failed to fetch GitHub activities",
					details: errorText,
					status: res.status,
				},
				{ status: res.status },
			);
		}

		const data = (await res.json()) as GitHubEvent[];

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to fetch GitHub activities",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
