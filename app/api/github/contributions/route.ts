import { NextResponse } from "next/server";

export async function GET() {
	try {
		const res = await fetch(
			"https://github.com/users/mehanisik/contributions",
			{
				headers: {
					"User-Agent": "blogy-app",
					Accept: "text/html",
				},
				next: { revalidate: 60 * 60 },
			},
		);

		if (!res.ok) {
			const errorText = await res.text();
			return NextResponse.json(
				{
					error: "Failed to fetch contributions page",
					details: errorText,
					status: res.status,
				},
				{ status: res.status },
			);
		}

		const html = await res.text();
		const match = html.match(
			/<svg[^>]*class="js-calendar-graph-svg"[\s\S]*?<\/svg>/,
		);

		if (!match) {
			return NextResponse.json(
				{ error: "Could not parse contributions SVG" },
				{ status: 500 },
			);
		}

		const svg = match[0];
		return new NextResponse(svg, {
			headers: {
				"Content-Type": "image/svg+xml; charset=utf-8",
				"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to fetch GitHub contributions",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
