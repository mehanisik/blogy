import {
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";

import { ErrorComponent } from "@/components/layout/error-component";
import { NotFoundComponent } from "@/components/layout/not-found";
import { PendingComponent } from "@/components/pending-component";
import { Meta } from "@/constants/meta-tags.constant";
import { Links } from "@/constants/root-links.constant";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: () => ({
			meta: Meta,
			links: Links,
		}),
		component: RootComponent,
		notFoundComponent: NotFoundComponent,
		errorComponent: ErrorComponent,
		pendingComponent: PendingComponent,
	},
);

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
				{import.meta.env.VITE_UMAMI_SCRIPT && (
					<script
						defer
						data-website-id={import.meta.env.VITE_UMAMI_WEBSITE_ID}
						src={import.meta.env.VITE_UMAMI_SCRIPT}
					/>
				)}
				<HeadContent />
			</head>
			<body className=" dark:bg-[#1c1c1c] bg-[#fcfcfc]  text-foreground antialiased font-body">
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
