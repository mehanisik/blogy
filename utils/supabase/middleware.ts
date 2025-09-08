import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request });

	const supabase = createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => {
						request.cookies.set(name, value);
					});

					supabaseResponse = NextResponse.next({ request });

					cookiesToSet.forEach(({ name, value, options }) => {
						supabaseResponse.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (request.nextUrl.pathname.startsWith("/admin")) {
		if (!user) {
			return NextResponse.redirect(new URL("/auth", request.url));
		}
	}

	if (request.nextUrl.pathname === "/auth" && user) {
		return NextResponse.redirect(new URL("/admin/dashboard", request.url));
	}

	return supabaseResponse;
}
