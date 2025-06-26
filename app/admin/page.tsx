import { Suspense } from "react";
import Loader from "@/components/loader";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export default function AdminPage() {
	return (
		<Suspense fallback={<Loader />}>
			<PageLayout>
				<div className="flex min-h-screen items-center justify-center py-12">
					<div className="w-full max-w-md space-y-8">
						<div className="text-center">
							<h1 className="text-3xl font-bold text-foreground mb-3">
								Admin Login
							</h1>
							<p className="text-muted-foreground">
								Sign in to access the dashboard
							</p>
						</div>

						<form action={login} className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									required
									placeholder="Enter your email"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									required
									placeholder="Enter your password"
								/>
							</div>

							<Button type="submit" className="w-full">
								Sign In
							</Button>
						</form>
					</div>
				</div>
			</PageLayout>
		</Suspense>
	);
}
