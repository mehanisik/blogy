import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import type { ReactElement } from "react";
import Navbar from "@/components/navbar";
import { env } from "@/env";
import { cn } from "@/utils/cn";
import "../styles/globals.css";

const switzer = localFont({
	src: "../public/fonts/Switzer-Regular.otf",
	variable: "--font-switzer",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
	title: {
		default: "Mehmet ISIK | Software Engineer & Full-Stack Developer",
		template: "%s | Mehmet ISIK",
	},
	description:
		"Personal blog and portfolio of Mehmet ISIK, a Software Engineer and Full-Stack Developer. Sharing insights on React, TypeScript, Next.js, and software development.",
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
	authors: [{ name: "Mehmet ISIK" }],
	creator: "Mehmet ISIK",
	publisher: "Mehmet ISIK",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: "Mehmet ISIK | Software Engineer & Full-Stack Developer",
		description:
			"Personal blog and portfolio of Mehmet ISIK, a Software Engineer and Full-Stack Developer. Sharing insights on React, TypeScript, Next.js, and software development.",
		url: env.NEXT_PUBLIC_BASE_URL,
		siteName: "Mehmet ISIK",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Mehmet ISIK Open Graph image",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Mehmet ISIK | Software Engineer & Full-Stack Developer",
		description:
			"Personal blog and portfolio of Mehmet ISIK, a Software Engineer and Full-Stack Developer. Sharing insights on React, TypeScript, Next.js, and software development.",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Mehmet ISIK Open Graph image",
			},
		],
		site: "@siralcntra",
		creator: "@siralcntra",
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
		google: "your-google-verification-code",
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
		<html lang="en" suppressHydrationWarning>
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
				<meta property="og:image" content="/og.png" />
				<meta name="twitter:image" content="/og.png" />
				<meta name="theme-color" content="#000000" />
				<meta name="color-scheme" content="light dark" />
				<Script
					src="https://app.rybbit.io/api/script.js"
					data-site-id="1099"
					strategy="afterInteractive"
				/>
			</head>
			<body className={cn(switzer.className, "font-sans antialiased")}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground p-3 rounded-md border border-border z-50"
				>
					Skip to main content
				</a>

				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					themes={["light", "dark", "yellow", "purple"]}
				>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
