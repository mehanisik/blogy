"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useId } from "react";
import { pageTransition, pageVariants } from "./variants";

interface PageTransitionProps {
	children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
	const pathname = usePathname();
	const mainId = useId();

	return (
		<AnimatePresence mode="wait">
			<motion.main
				key={pathname}
				id={mainId}
				className="flex-1 px-4 md:px-0"
				initial="initial"
				animate="in"
				exit="out"
				variants={pageVariants}
				transition={pageTransition}
				style={{
					willChange: "transform, opacity, filter",
					backfaceVisibility: "hidden",
				}}
			>
				{children}
			</motion.main>
		</AnimatePresence>
	);
}
