import { signinFn } from "@/services";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
	component: SignIn,
	beforeLoad: async ({ context }) => {
		if (context.user) {
			throw redirect({
				to: "/admin",
			});
		}
	},
	validateSearch: (search: Record<string, unknown>) => {
		return {
			redirect: search.redirect as string | undefined,
		};
	},
});

function SignIn() {
	const navigate = useNavigate();

	return (
		<section className="max-w-3xl mx-auto min-h-screen flex items-center justify-center">
			<div className="flex flex-col gap-4 w-full">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-card-foreground shadow-sm mx-auto w-full max-w-md transition-colors">
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
							<form
								className="grid gap-4"
								onSubmit={async (event) => {
									event.preventDefault();
									const formData = new FormData(event.currentTarget);
									const email = formData.get("email") as string;
									const password = formData.get("password") as string;
									const res = await signinFn({ data: { email, password } });
									if (res.succes)
										navigate({ to: "/admin", search: { redirect: undefined } });
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
										className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-colors [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-900 [&:-webkit-autofill]:!text-gray-900 dark:[&:-webkit-autofill]:!text-gray-100"
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
										className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-colors [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-900 [&:-webkit-autofill]:!text-gray-900 dark:[&:-webkit-autofill]:!text-gray-100"
										placeholder="Enter your password"
										required
										autoComplete="current-password"
									/>
								</div>
								<button
									type="submit"
									className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-100/90 h-10 px-4 py-2 w-full"
								>
									Log in
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
