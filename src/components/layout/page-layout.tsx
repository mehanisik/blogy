import type React from "react";
import Header from "./header";

interface PageLayoutProps {
	children: React.ReactNode;
	title?: string;
}

function PageLayout({ children, title }: PageLayoutProps) {
	return (
		<div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  transition-colors duration-200">
			<Header />
			<main className="py-4 sm:py-6 lg:py-8">
				<div className="max-w-3xl mx-auto">
					{title && (
						<h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-200">
							{title}
						</h1>
					)}
					{children}
				</div>
			</main>
		</div>
	);
}
export default PageLayout;
