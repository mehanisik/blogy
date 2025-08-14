import type { Metadata, Viewport } from "next";

import Script from "next/script";
import { ThemeProvider } from "next-themes";
import type { ReactElement } from "react";
import { env } from "@/env";
import { cn, fonts } from "@/utils/helpers";
import "../styles/globals.css";
import { Footer } from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { PostHogProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/siteconfig";

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
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
		url: env.NEXT_PUBLIC_BASE_URL,
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
		canonical: env.NEXT_PUBLIC_BASE_URL,
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
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
			className={cn("scroll-smooth", fonts.className)}
		>
			<head>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="128x128"
					href="/favicon-128x128.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="196x196"
					href="/favicon-196x196.png"
				/>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta
					property="og:image"
					content={siteConfig.seo.openGraph.imagePath}
				/>
				<meta
					name="twitter:image"
					content={siteConfig.seo.openGraph.imagePath}
				/>
				<meta name="theme-color" content="#000000" />
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
						url: env.NEXT_PUBLIC_BASE_URL,
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
						url: env.NEXT_PUBLIC_BASE_URL,
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
					<PostHogProvider>
						<div className="flex flex-col justify-between min-h-screen antialiased max-w-5xl mx-auto">
							<Navbar />
							{children}
							<Footer />
						</div>
						<Toaster richColors position="top-right" />
					</PostHogProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
