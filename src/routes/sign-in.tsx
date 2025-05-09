import { checkAuthFn, signinFn } from "@/services/auth";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/sign-in")({
	loader: async () => {
		const result = await checkAuthFn();

		if (result.authenticated) {
			throw redirect({
				to: "/admin",
			});
		}
	},
	component: SignIn,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			redirect: search.redirect as string | undefined,
		};
	},
});

function SignIn() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<section className="max-w-3xl mx-auto min-h-screen flex items-center justify-center">
			<div className="flex flex-col gap-4 w-full">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-[#fcfcfc] dark:bg-[#1c1c1c] text-neutral-900 dark:text-neutral-100 shadow-sm mx-auto w-full max-w-md transition-colors">
					<div className="flex flex-col space-y-1.5 p-6 items-center">
						<h3 className="font-semibold tracking-tight text-xl text-gray-900 dark:text-gray-100">
							Log in with your email
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Enter your information to login
						</p>
					</div>
					<div className="p-6 pt-0">
						<div className="grid gap-4">
							{error && (
								<div className="p-3 rounded-md bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-sm">
									{error}
								</div>
							)}
							<form
								className="grid gap-4"
								onSubmit={async (event) => {
									event.preventDefault();
									setError(null);
									setIsLoading(true);

									try {
										const formData = new FormData(event.currentTarget);
										const email = formData.get("email") as string;
										const password = formData.get("password") as string;

										if (!email || !password) {
											setError("Please enter both email and password");
											return;
										}

										const res = await signinFn({ data: { email, password } });

										if (res.error) {
											setError(res.message || "Failed to sign in");
											return;
										}

										if (res.success) {
											navigate({ to: "/admin" });
										}
									} catch (err) {
										setError("An unexpected error occurred. Please try again.");
									} finally {
										setIsLoading(false);
									}
								}}
							>
								<div className="grid gap-2">
									<label
										className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
										htmlFor="email"
									>
										Email
									</label>
									<input
										type="email"
										name="email"
										className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700  bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-colors [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-900 [&:-webkit-autofill]:!text-gray-900 dark:[&:-webkit-autofill]:!text-gray-100"
										placeholder="m@example.com"
										required
										autoComplete="email"
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex justify-between">
										<label
											className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
											htmlFor="password"
										>
											Password
										</label>
									</div>
									<input
										type="password"
										name="password"
										className="flex h-10 w-full bg-gray-100 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent  px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-colors [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-900 [&:-webkit-autofill]:!text-gray-900 dark:[&:-webkit-autofill]:!text-gray-100"
										placeholder="Enter your password"
										required
										autoComplete="current-password"
									/>
								</div>
								<button
									type="submit"
									disabled={isLoading}
									className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 dark:bg-[#313131] text-white dark:text-white hover:bg-gray-900/90  h-10 px-4 py-2 w-full"
								>
									{isLoading ? "Signing in..." : "Log in"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
