import type { ReactNode } from "react";
import Header from "./header";
import { SEO } from "./seo";

interface PageLayoutProps {
	children: ReactNode;
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: "website" | "article" | "profile";
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	canonicalUrl?: string;
	noIndex?: boolean;
}

export function PageLayout({
	children,
	title,
	description,
	keywords,
	image,
	url,
	type,
	author,
	publishedTime,
	modifiedTime,
	canonicalUrl,
	noIndex,
}: PageLayoutProps) {
	return (
		<>
			<SEO
				title={title}
				description={description}
				keywords={keywords}
				image={image}
				url={url}
				type={type}
				author={author}
				publishedTime={publishedTime}
				modifiedTime={modifiedTime}
				canonicalUrl={canonicalUrl}
				noIndex={noIndex}
			/>
			<div className="h-screen flex flex-col max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
				<Header />
				<main className="flex-1 py-4 sm:py-6 lg:py-8 h-calc[100vh-100px]">
					{children}
				</main>
				<footer className="py-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
					<p>© {new Date().getFullYear()} Blogy. All rights reserved.</p>
				</footer>
			</div>
		</>
	);
}
