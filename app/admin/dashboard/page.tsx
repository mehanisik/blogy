import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { env } from "@/env";
import { supabaseServer } from "@/utils/supabase/server";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Admin dashboard.",
	robots: {
		index: false,
		follow: false,
		googleBot: { index: false, follow: false },
	},
	alternates: { canonical: `${env.NEXT_PUBLIC_BASE_URL}/admin/dashboard` },
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
