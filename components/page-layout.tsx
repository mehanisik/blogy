import type { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
	className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
	return (
		<div className={`max-w-3xl mx-auto px-4 ${className}`}>{children}</div>
	);
}
