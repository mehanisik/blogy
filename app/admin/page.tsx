import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getBaseUrl } from "@/utils/helpers";
import { supabaseServer } from "@/utils/supabase/server";

export const metadata: Metadata = {
	title: "Admin",
	description: "Admin panel.",
	robots: {
		index: false,
		follow: false,
		googleBot: { index: false, follow: false },
	},
	alternates: { canonical: `${getBaseUrl()}/admin` },
};

export default async function AdminPage() {
	const supabase = await supabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/auth");
	}

	redirect("/admin/dashboard");
}
