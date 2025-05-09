import supabase from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { handleSupabaseError } from "./supabase-error";

export const checkAuthFn = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				return { authenticated: false };
			}

			if (!user) {
				return { authenticated: false };
			}

			const { id, email, user_metadata, app_metadata } = user;
			return {
				authenticated: true,
				user: { id, email, user_metadata, app_metadata },
			};
		} catch (error) {
			return { authenticated: false };
		}
	},
);

export const signinFn = createServerFn()
	.validator((d) => d as { email: string; password: string })
	.handler(async ({ data }) => {
		const { email, password } = data;

		if (!email || !password) {
			return {
				error: true,
				message: "Please enter both email and password",
			};
		}

		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (signInError) {
			return {
				error: true,
				message: signInError.message,
			};
		}

		return { success: true };
	});

export const signOutFn = createServerFn({ method: "POST" }).handler(
	async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) {
				return {
					success: false,
					error: true,
					message: error.message,
				};
			}

			return { success: true };
		} catch (err) {
			handleSupabaseError(err);
		}
	},
);
