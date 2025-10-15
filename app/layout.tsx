import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "next-themes";
import type { ReactElement } from "react";
import { cn, font, getBaseUrl } from "@/utils/helpers";
import "../styles/globals.css";
import { Footer } from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { AuthProvider, PostHogProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/siteconfig";
import { PageTransition } from "@/utils/motion/page-transition";

export const metadata: Metadata = {
	metadataBase: new URL(getBaseUrl()),
	title: {
		default: siteConfig.seo.defaultTitle,
		template: siteConfig.seo.titleTemplate,
	},
	description: siteConfig.seo.description,
	keywords: siteConfig.seo.keywords,
	authors: [{ name: siteConfig.seo.authorName }],
	creator: siteConfig.seo.authorName,
	publisher: siteConfig.seo.authorName,
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: siteConfig.seo.defaultTitle,
		description: siteConfig.seo.description,
		url: getBaseUrl(),
		siteName: siteConfig.seo.siteName,
		locale: "en_US",
		type: "website",
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: siteConfig.seo.openGraph.imageAlt,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.seo.defaultTitle,
		description: siteConfig.seo.description,
		images: [
			{
				url: siteConfig.seo.openGraph.imagePath,
				width: 1200,
				height: 630,
				alt: siteConfig.seo.openGraph.imageAlt,
			},
		],
		site: siteConfig.seo.twitter.site,
		creator: siteConfig.seo.twitter.creator,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: siteConfig.seo.verification.google,
	},
	alternates: {
		canonical: getBaseUrl(),
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "hsl(var(--background))" },
		{ media: "(prefers-color-scheme: dark)", color: "hsl(var(--background))" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

export default function RootLayout({ children }: { children: ReactElement }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn("scroll-smooth", font.className)}
		>
			<head>
				<link rel="icon" type="image/svg+xml" href="/icon0.svg" />
				<link rel="icon" type="image/png" sizes="192x192" href="/icon1.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta
					property="og:image"
					content={siteConfig.seo.openGraph.imagePath}
				/>
				<meta
					name="twitter:image"
					content={siteConfig.seo.openGraph.imagePath}
				/>
				<meta name="theme-color" content="hsl(var(--background))" />
				<meta name="color-scheme" content="light dark" />
				{(() => {
					const twitterHandle = siteConfig.seo.twitter.site?.startsWith("@")
						? siteConfig.seo.twitter.site.slice(1)
						: siteConfig.seo.twitter.site;
					const sameAs = twitterHandle
						? [`https://twitter.com/${twitterHandle}`]
						: [];
					const personJsonLd = {
						"@context": "https://schema.org",
						"@type": "Person",
						name: siteConfig.seo.authorName,
						url: getBaseUrl(),
						image: siteConfig.seo.openGraph.imagePath,
						jobTitle: "Software Engineer",
						worksFor: {
							"@type": "Organization",
							name: siteConfig.seo.siteName,
						},
						sameAs,
					};
					const websiteJsonLd = {
						"@context": "https://schema.org",
						"@type": "WebSite",
						name: siteConfig.seo.siteName,
						url: getBaseUrl(),
						description: siteConfig.seo.description,
					};
					return (
						<>
							<script
								type="application/ld+json"
								dangerouslySetInnerHTML={{
									__html: JSON.stringify(personJsonLd),
								}}
							/>
							<script
								type="application/ld+json"
								dangerouslySetInnerHTML={{
									__html: JSON.stringify(websiteJsonLd),
								}}
							/>
						</>
					);
				})()}
			</head>
			<body suppressHydrationWarning={true}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground p-3 rounded-md border border-border z-50"
				>
					{siteConfig.pages.layout.skipToContentLabel}
				</a>

				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
					themes={["light", "dark", "yellow", "purple"]}
				>
					<AuthProvider>
						<PostHogProvider>
							<div className="flex flex-col justify-between min-h-screen antialiased max-w-6xl mx-auto">
								<Navbar />
								<PageTransition>{children}</PageTransition>
								<Footer />
							</div>
							<Toaster richColors position="top-right" />
						</PostHogProvider>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
