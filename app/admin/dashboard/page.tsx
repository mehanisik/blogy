import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getBaseUrl } from "@/utils/helpers";
import { supabaseServer } from "@/utils/supabase/server";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Admin dashboard.",
	robots: {
		index: false,
		follow: false,
		googleBot: { index: false, follow: false },
	},
	alternates: { canonical: `${getBaseUrl()}/admin/dashboard` },
};

export default async function DashboardPage() {
	const supabase = await supabaseServer();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/auth");
	}

	return <AdminDashboard />;
}
