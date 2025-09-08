"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/utils/supabase/server";

export async function signOut() {
	const supabase = await supabaseServer();
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message || "Unable to sign out");
	}

	return redirect("/auth");
}
