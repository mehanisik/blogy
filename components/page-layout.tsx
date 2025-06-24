import type { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
	className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
	return (
		<main className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
			{children}
		</main>
	);
}
