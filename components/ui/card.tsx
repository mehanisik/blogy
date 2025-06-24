import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps {
	children: ReactNode;
	className?: string;
}

interface CardHeaderProps {
	children: ReactNode;
	className?: string;
}

interface CardContentProps {
	children: ReactNode;
	className?: string;
}

interface CardFooterProps {
	children: ReactNode;
	className?: string;
}

export function Card({ children, className }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-lg border border-border bg-card text-card-foreground shadow-sm",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function CardHeader({ children, className }: CardHeaderProps) {
	return (
		<div className={cn("flex flex-col space-y-1.5 p-6", className)}>
			{children}
		</div>
	);
}

export function CardContent({ children, className }: CardContentProps) {
	return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardFooterProps) {
	return (
		<div className={cn("flex items-center p-6 pt-0", className)}>
			{children}
		</div>
	);
}
