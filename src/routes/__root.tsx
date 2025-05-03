import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";

import { NotFoundComponent } from "@/components/layout/not-found";
import { Meta } from "@/constants/meta-tags.constant";
import { Links } from "@/constants/root-links.constant";
import { fetchUser } from "@/services";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	user: Awaited<ReturnType<typeof fetchUser>>;
}>()({
	beforeLoad: async ({ context }) => {
		await context.queryClient.invalidateQueries({ queryKey: ["user"] });

		const user = await context.queryClient.fetchQuery({
			queryKey: ["user"],
			queryFn: ({ signal }) => fetchUser({ signal }),
			staleTime: 0,
		});
		return { user };
	},

	head: () => ({
		meta: Meta,
		links: Links,
	}),
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="manifest" href="/site.webmanifest" />
				<HeadContent />
			</head>
			<body className=" dark:bg-black bg-white  text-foreground antialiased font-body">
				<ScriptOnce>
					{`document.documentElement.classList.toggle(
			  'dark',
			  localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			  )`}
				</ScriptOnce>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
