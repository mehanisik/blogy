import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/env";
import type { Database } from "@/schemas/supabase";

export const supabaseStatic = () => {
	return createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return [];
				},
			},
		},
	);
};

export const supabaseMiddleware = async (request: NextRequest) => {
	let supabaseResponse = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					for (const { options: _options, ...cookie } of cookiesToSet) {
						request.cookies.set(cookie);
					}

					supabaseResponse = NextResponse.next({ request });

					for (const cookie of cookiesToSet) {
						supabaseResponse.cookies.set(cookie);
					}
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user && request.nextUrl.pathname.startsWith("/admin/dashboard")) {
		const url = request.nextUrl.clone();
		url.pathname = "/admin";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
};
