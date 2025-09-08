import { z } from "zod";

export const getBaseUrl = () => {
	const customUrl = z
		.string()
		.min(1)
		.safeParse(process.env.NEXT_PUBLIC_APP_URL).data;
	if (customUrl) {
		return customUrl;
	}

	if (
		process.env.VERCEL_ENV === "production" &&
		process.env.VERCEL_PROJECT_PRODUCTION_URL
	) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	return "http://localhost:3000";
};
