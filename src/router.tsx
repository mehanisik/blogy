import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { routeTree } from "./routeTree.gen";
import { lazy } from "react";

export function createRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	});

	return routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			context: { queryClient, user: null },
			defaultPreload: "intent",
			scrollRestoration: true,
			defaultStructuralSharing: true,
		}),
		queryClient,
	);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

declare global {
	interface Window {
		getRouter: () => ReturnType<typeof createRouter>;
		getQueryClient: () => QueryClient;
	}
}

export const RouterDevtools = import.meta.env.PROD
	? () => null
	: lazy(() =>
			import("@tanstack/react-router-devtools").then((mod) => ({
				default: mod.TanStackRouterDevtools,
			})),
		);

export const QueryDevtools = import.meta.env.PROD
	? () => null
	: lazy(() =>
			import("@tanstack/react-query-devtools").then((mod) => ({
				default: mod.ReactQueryDevtools,
			})),
		);
