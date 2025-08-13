"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/utils/supabase/server";

export async function signIn(
	email: string,
	password: string,
	redirectTo?: string,
) {
	const supabase = await supabaseServer();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message || "Unable to sign in");
	}

	// Check if user is admin
	if (data?.user) {
		const { data: adminData } = await supabase
			.from("app_config")
			.select("admin_id")
			.eq("admin_id", data.user.id)
			.maybeSingle();

		if (adminData) {
			// User is admin, redirect to admin dashboard or requested admin route
			const adminRedirect = redirectTo?.startsWith("/admin")
				? redirectTo
				: "/admin/dashboard";
			redirect(adminRedirect);
		} else {
			// User is not admin, redirect to home
			redirect("/");
		}
	}

	// Default redirect
	redirect("/");
}
