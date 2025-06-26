import { env } from "../env";

export const getBaseUrl = () => {
	if (env.NEXT_PUBLIC_NODE_ENV === "production") {
		return env.NEXT_PUBLIC_BASE_URL;
	}
	if (env.NEXT_PUBLIC_NODE_ENV === "development") {
		return "http://localhost:3000";
	}
	return "http://localhost:3000";
};
