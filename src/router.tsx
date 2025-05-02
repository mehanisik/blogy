import { QueryClient, MutationCache, Mutation } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/layout/detault-catch-boundry";
import NotFound from "./components/layout/not-found";

export function createRouter() {
	const queryClient = new QueryClient({
		mutationCache: new MutationCache({
			onSettled: (
				_: unknown,
				__: Error | null,
				___: unknown,
				context: unknown,
				mutation: Mutation<unknown, unknown, unknown, unknown>,
			) => {
				const queryKey = mutation.options.mutationKey?.[0];
				if (queryKey) {
					queryClient.invalidateQueries({ queryKey: [queryKey] });
				}
			},
		}),
	});

	return routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			context: {
				queryClient,
				user: null,
			},
			defaultPreload: "intent",
			defaultPreloadStaleTime: 0,
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: NotFound,
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
