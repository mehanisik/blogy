"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabaseClient } from "@/utils/supabase/client";

interface AuthContextValue {
	session: Session | null;
	user: User | null;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		let mounted = true;
		supabaseClient.auth.getSession().then(({ data }) => {
			if (mounted) setSession(data.session);
		});
		const { data: sub } = supabaseClient.auth.onAuthStateChange((_, s) => {
			setSession(s);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);

	const user = session?.user ?? null;

	const value = useMemo<AuthContextValue>(
		() => ({
			session,
			user,
			signOut: async () => {
				await supabaseClient.auth.signOut();
			},
		}),
		[session, user],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
