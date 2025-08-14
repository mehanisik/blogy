"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/utils/helpers/sign-in";

const formSchema = z.object({
	email: z.email("Please enter a valid email address").max(254),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(128),
});

type FormData = z.infer<typeof formSchema>;

export function AuthForm() {
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirectTo");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data: FormData) => {
		try {
			await signIn(data.email, data.password, redirectTo || undefined);
		} catch (error) {
			toast.error("Authentication failed", {
				description:
					error instanceof Error ? error.message : "Invalid credentials",
			});
		}
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

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Email
							</label>
							<Input
								id={crypto.randomUUID()}
								type="email"
								autoComplete="email"
								placeholder="Enter your email"
								className="h-10"
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-sm text-destructive">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label
								htmlFor="password"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Password
							</label>
							<Input
								id={crypto.randomUUID()}
								type="password"
								autoComplete="current-password"
								placeholder="Enter your password"
								className="h-10"
								{...register("password")}
							/>
							{errors.password && (
								<p className="text-sm text-destructive">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<Button type="submit" className="w-full h-10" disabled={isSubmitting}>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</Button>
				</form>

				<p className="text-center text-xs text-muted-foreground">
					Secure authentication with encrypted data transmission
				</p>
			</div>
		</main>
	);
}
