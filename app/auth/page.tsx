import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AuthSection from "@/components/auth/auth-section";
import AuthLoader from "@/components/loaders/auth-loader";
import { getBaseUrl } from "@/utils/helpers";
import { supabaseServer } from "@/utils/supabase/server";

export const metadata: Metadata = {
	title: "Sign in",
	description: "Sign in to access the admin dashboard.",
	robots: {
		index: false,
		follow: false,
		googleBot: { index: false, follow: false },
	},
	alternates: { canonical: `${getBaseUrl()}/auth` },
};

export default async function AuthPage() {
	const supabase = await supabaseServer();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (session) {
		redirect("/admin/dashboard");
	}

	return (
		<Suspense fallback={<AuthLoader />}>
			<AuthSection />
		</Suspense>
	);
}
