import type { ReactNode } from "react";
import { SocialLinks } from "../social-links";
import Header from "./header";
import { SEO } from "./seo";

interface PageLayoutProps {
	children: ReactNode;
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
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
	image,
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
				image={image}
				type={type}
				author={author}
				publishedTime={publishedTime}
				modifiedTime={modifiedTime}
				canonicalUrl={canonicalUrl}
				noIndex={noIndex}
			/>
			<div className="h-screen flex flex-col max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
				<Header />
				<main className="flex-1 py-4 sm:py-6 lg:py-8 h-calc[100vh-100px]">
					{children}
				</main>
				<footer className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-[#313131] text-sm text-gray-600 dark:text-gray-400 bg-transparent">
					<span className="font-medium">
						© {new Date().getFullYear()} mehanisik
					</span>
					<div className="flex-1 flex justify-end">
						<SocialLinks />
					</div>
				</footer>
			</div>
		</>
	);
}
