import type {
	PageTextConfig,
	SiteConfig,
	SiteSEOConfig,
} from "@/types/site-config";

export const siteConfig: SiteConfig = {
	seo: {
		defaultTitle: "mehanisik | Software Developer",
		titleTemplate: "%s | mehanisik",
		description:
			"Personal blog and portfolio of mehanisik, a Software Developer. Sharing insights on React, TypeScript, Next.js, and software development.",
		keywords: [
			"software engineer",
			"full-stack developer",
			"react",
			"typescript",
			"next.js",
			"web development",
			"portfolio",
			"blog",
			"mehmet isik",
		],
		authorName: "Mehmet ISIK",
		siteName: "Mehmet ISIK",
		twitter: {
			site: "@siralcntra",
			creator: "@siralcntra",
		},
		openGraph: {
			imagePath: "/og.png",
			imageAlt: "Mehmet ISIK Open Graph image",
		},
		verification: {
			google: "",
		},
	} satisfies SiteSEOConfig,
	pages: {
		layout: {
			skipToContentLabel: "Skip to main content",
		},
		error: {
			title: "Something went wrong!",
			description:
				"An unexpected error occurred. Please try again or contact support if the problem persists.",
			tryAgainLabel: "Try again",
			goHomeLabel: "Go Home",
			errorDetailsSummary: "Error details (development only)",
		},
		notFound: {
			heading: "404",
			title: "Page Not Found",
			description: "Sorry, the page you are looking for does not exist.",
			goHomeLabel: "Go back home",
		},
	} satisfies PageTextConfig,
} satisfies SiteConfig;
