import {
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";

import { NotFoundComponent } from "@/components/layout/not-found";
import { Meta } from "@/constants/meta-tags.constant";
import { Links } from "@/constants/root-links.constant";

export const Route = createRootRoute({
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
