import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ErrorComponent } from "./components/layout/error-component";
import { NotFoundComponent } from "./components/layout/not-found";
import { PendingComponent } from "./components/pending-component";
import { routeTree } from "./routeTree.gen";

export const createRouter = () => {
	const queryClient = new QueryClient();

	const router = routerWithQueryClient(
		createTanstackRouter({
			routeTree,
			context: { queryClient },
			defaultPreload: "intent",
			notFoundMode: "root",
			scrollRestoration: true,
			defaultPendingComponent: PendingComponent,
			defaultErrorComponent: ErrorComponent,
			defaultNotFoundComponent: NotFoundComponent,
		}),
		queryClient,
	);
	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
