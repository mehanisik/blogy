import { notFound, redirect } from "@tanstack/react-router";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const handleSupabaseError = (error: any) => {
	if (error.code === "PGRST116" || error.code === "404") {
		throw notFound();
	}

	if (error.code === "401" || error.status === 401) {
		return redirect({
			to: "/sign-in",
			search: {
				redirect: "/admin",
			},
		});
	}

	throw new Error(`Database error: ${error.message || "Unknown error"}`);
};
