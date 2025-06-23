import type { NextRequest } from "next/server";

import { supabaseMiddleware } from "@/utils/supabase";

const middleware = (request: NextRequest) => {
	return supabaseMiddleware(request);
};

const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};

export { middleware, config };
