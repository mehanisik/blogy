"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseServer } from "../supabase/server";

const signInSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function signInAction(formData: FormData): Promise<void> {
	const supabase = await supabaseServer();

	const rawFormData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const validatedFields = signInSchema.safeParse(rawFormData);

	if (!validatedFields.success) {
		const errorMessage = validatedFields.error.issues
			.map((issue) => issue.message)
			.join(", ");
		throw new Error(errorMessage);
	}

	const { data, error } = await supabase.auth.signInWithPassword({
		email: validatedFields.data.email,
		password: validatedFields.data.password,
	});

	if (error) {
		throw new Error(error.message || "Unable to sign in");
	}

	if (!data.user || !data.session) {
		throw new Error("Sign in failed - no user or session returned");
	}

	revalidatePath("/", "layout");

	redirect("/admin/dashboard");
}
