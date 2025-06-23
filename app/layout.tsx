import env from "@/utils/env";
import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import type { ReactElement } from "react";
import Navbar from "@/components/navbar";
import { cn } from "@/utils/cn";

const switzer = localFont({
	src: "../public/Switzer-Regular.otf",
	variable: "--font-switzer",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(env.BASE_URL),
	title: {
		default: "Mehanisik | Personal Blog",
		template: "%s | Mehanisik",
	},
	description:
		"This is my personal blog where I share my journey, projects, and thoughts as I learn and grow in software development",
	keywords: [
		"software engineer",
		"full-stack development",
		"react",
		"typescript",
		"next.js",
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
		title: "Mehanisik | Personal Blog",
		description:
			"This is my personal blog where I share my journey, projects, and thoughts as I learn and grow in software development",
		url: env.BASE_URL,
		siteName: "Mehanisik",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "https://placehold.co/1200x630?text=Mehanisik+Blog",
				width: 1200,
				height: 630,
				alt: "Mehanisik Blog Open Graph Image",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Mehanisik | Personal Blog",
		description:
			"This is my personal blog where I share my journey, projects, and thoughts as I learn and grow in software development",
		images: [
			{
				url: "https://placehold.co/1200x630?text=Mehanisik+Blog",
				width: 1200,
				height: 630,
				alt: "Mehanisik Blog Twitter Card",
			},
		],
		site: "@mehanisik",
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
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({ children }: { children: ReactElement }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />
				<Script
					src="https://app.rybbit.io/api/script.js"
					data-site-id="1099"
					strategy="afterInteractive"
				/>
			</head>
			<body className={cn(switzer.className, "font-sans antialiased")}>
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
