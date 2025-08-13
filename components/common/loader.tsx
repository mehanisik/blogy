"use client";

import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoaderProps extends ComponentProps<"div"> {
	label?: string;
	fullScreen?: boolean;
	skeletonRows?: number;
	size?: "sm" | "md" | "lg";
}

export default function Loader({
	label = "Loading...",
	fullScreen = true,
	skeletonRows = 0,
	size = "md",
	className,
	...props
}: LoaderProps) {
	const sizeClasses =
		size === "sm" ? "h-4 w-4" : size === "lg" ? "h-8 w-8" : "h-6 w-6";

	return (
		<div
			className={[
				"w-full",
				fullScreen ? "min-h-[50vh] flex items-center justify-center" : "",
				className ?? "",
			].join(" ")}
			{...props}
		>
			<div className="flex flex-col items-center gap-4 w-full max-w-3xl">
				<div className="inline-flex items-center gap-2 text-muted-foreground">
					<Loader2
						className={["animate-spin text-primary", sizeClasses].join(" ")}
					/>
					<span className="text-sm">{label}</span>
				</div>
				{skeletonRows > 0 && (
					<div className="w-full space-y-2">
						{Array.from({ length: skeletonRows }).map(() => (
							<Skeleton key={crypto.randomUUID()} className="h-4 w-full" />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
