import { signIn } from "@/services";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/sign-in")({
	component: SignIn,
	beforeLoad: async ({ context }) => {
		if (context.user) {
			throw redirect({
				to: "/admin",
			});
		}
	},
});

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const result = await signIn({ data: { email, password } });
			if (result.error) {
				setError(result.message);
			} else {
				navigate({ to: "/admin" });
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<section className="max-w-3xl mx-auto min-h-screen flex items-center justify-center">
			<div className="flex flex-col gap-4 w-full">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto w-full max-w-md">
					<div className="flex flex-col space-y-1.5 p-6 items-center">
						<h3 className="font-semibold tracking-tight text-xl">
							Log in with your email
						</h3>
						<p className="text-sm text-zinc-600">
							Enter your information to login
						</p>
					</div>
					<div className="p-6 pt-0">
						<div className="grid gap-4">
							<form className="grid gap-4" onSubmit={handleSubmit}>
								<div className="grid gap-2">
									<label
										className="text-sm font-medium leading-none"
										htmlFor="email"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex justify-between">
										<label
											className="text-sm font-medium leading-none"
											htmlFor="password"
										>
											Password
										</label>
									</div>
									<input
										type="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										placeholder="Enter your password"
										required
									/>
								</div>
								{error && <p className="text-sm text-red-500">{error}</p>}
								<button
									type="submit"
									className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-white hover:bg-zinc-900/90 h-10 px-4 py-2 w-full"
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
