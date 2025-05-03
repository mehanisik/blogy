import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "./router";

const router = createRouter();

export function App() {
	return <RouterProvider router={router} />;
}
