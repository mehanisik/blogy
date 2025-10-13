"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/helpers";
import { cardHoverVariants, containerVariants } from "./variants";

interface MotionContainerProps extends HTMLMotionProps<"div"> {
	children: ReactNode;
	stagger?: boolean;
	className?: string;
}

export function MotionContainer({
	children,
	stagger = true,
	className,
	...props
}: MotionContainerProps) {
	return (
		<motion.div
			className={cn(className)}
			variants={stagger ? containerVariants : undefined}
			initial="hidden"
			animate="visible"
			{...props}
		>
			{children}
		</motion.div>
	);
}

// Motion Card with hover effects
interface MotionCardProps extends HTMLMotionProps<"div"> {
	children: ReactNode;
	className?: string;
	hover?: boolean;
}

export function MotionCard({
	children,
	className,
	hover = true,
	...props
}: MotionCardProps) {
	return (
		<motion.div
			className={cn(className)}
			variants={hover ? cardHoverVariants : undefined}
			initial="initial"
			animate="visible"
			whileHover={hover ? "hover" : undefined}
			whileTap={hover ? "tap" : undefined}
			style={{
				transformStyle: "preserve-3d",
				backfaceVisibility: "hidden",
			}}
			{...props}
		>
			{children}
		</motion.div>
	);
}
