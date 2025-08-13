export interface SiteSEOConfig {
	defaultTitle: string;
	titleTemplate: string;
	description: string;
	keywords: string[];
	authorName: string;
	siteName: string;
	twitter: {
		site: string;
		creator: string;
	};
	openGraph: {
		imagePath: string;
		imageAlt: string;
	};
	verification: {
		google?: string;
	};
}

export interface PageTextConfig {
	layout: {
		skipToContentLabel: string;
	};
	error: {
		title: string;
		description: string;
		tryAgainLabel: string;
		goHomeLabel: string;
		errorDetailsSummary: string;
	};
	notFound: {
		heading: string;
		title: string;
		description: string;
		goHomeLabel: string;
	};
}

export interface SiteConfig {
	seo: SiteSEOConfig;
	pages: PageTextConfig;
}
