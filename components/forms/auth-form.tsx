"use client";

import { useId, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/utils/helpers/sign-in";

export function AuthForm() {
	const emailId = useId();
	const passwordId = useId();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (formData: FormData) => {
		setError(null);
		startTransition(async () => {
			try {
				await signInAction(formData);
				toast.success("Welcome back!", {
					description: "You have been signed in successfully.",
				});
			} catch (err) {
				// Check if this is a Next.js redirect error (these should not be treated as auth errors)
				if (
					err &&
					typeof err === "object" &&
					"digest" in err &&
					typeof err.digest === "string" &&
					err.digest.includes("NEXT_REDIRECT")
				) {
					// This is a successful redirect, not an error
					return;
				}

				const errorMessage =
					err instanceof Error ? err.message : "Authentication failed";
				setError(errorMessage);
				toast.error("Authentication failed", {
					description: errorMessage,
				});
			}
		});
	};

	return (
		<main className="w-full max-w-md mx-auto border p-4">
			<div className="space-y-6">
				<div className="text-center space-y-2">
					<h2 className="text-2xl font-semibold tracking-tight">
						Welcome back
					</h2>
					<p className="text-muted-foreground">
						Enter your credentials to sign in
					</p>
				</div>

				<form action={handleSubmit} className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor={emailId}>Email</Label>
							<Input
								id={emailId}
								name="email"
								type="email"
								autoComplete="email"
								placeholder="Enter your email"
								className="h-10"
								required
								disabled={isPending}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor={passwordId}>Password</Label>
							<Input
								id={passwordId}
								name="password"
								type="password"
								autoComplete="current-password"
								placeholder="Enter your password"
								className="h-10"
								required
								minLength={6}
								disabled={isPending}
							/>
						</div>

						{error && (
							<div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
								{error}
							</div>
						)}
					</div>

					<Button type="submit" className="w-full h-10" disabled={isPending}>
						{isPending ? "Signing in..." : "Sign in"}
					</Button>
				</form>

				<p className="text-center text-xs text-muted-foreground">
					Secure authentication with encrypted data transmission
				</p>
			</div>
		</main>
	);
}
