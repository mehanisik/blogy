import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/layout/header";

import TanstackQueryLayout from "../integrations/tanstack-query/layout";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Modern Web Application",
			},
			{
				name: "description",
				content:
					"A modern web application built with TanStack Router and Query",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),

	component: () => (
		<RootDocument>
			<div className="flex flex-col w-full min-h-screen antialiased pt-8 pb-12 px-4 md:px-0 overflow-hidden">
				<main className="max-w-2xl mx-auto flex flex-col gap-2.5 w-full">
					<Header />
					<div className="flex-grow">
						<Outlet />
					</div>
				</main>
			</div>
			{process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
			<TanstackQueryLayout />
		</RootDocument>
	),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
