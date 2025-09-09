import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
};

export const cardHoverVariants: Variants = {
	initial: {
		scale: 1,
		y: 0,
		boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
		rotateX: 0,
		rotateY: 0,
	},
	hover: {
		scale: 1.03,
		y: -8,
		boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
		rotateX: 2,
		rotateY: 2,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			mass: 0.8,
		},
	},
	tap: {
		scale: 0.97,
		transition: {
			type: "spring",
			stiffness: 500,
			damping: 30,
			mass: 0.5,
		},
	},
};

export const navLinkVariants: Variants = {
	initial: {
		scale: 1,
		color: "var(--muted-foreground)",
		y: 0,
	},
	hover: {
		scale: 1.08,
		color: "var(--foreground)",
		y: -2,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
			mass: 0.6,
		},
	},
	active: {
		color: "var(--foreground)",
		scale: 1,
		y: 0,
	},
};

export const pageVariants: Variants = {
	initial: {
		opacity: 0,
		y: 30,
		filter: "blur(4px)",
	},
	in: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
	},
	out: {
		opacity: 0,
		y: -30,
		filter: "blur(4px)",
	},
};

export const pageTransition = {
	type: "spring" as const,
	stiffness: 200,
	damping: 25,
	mass: 0.8,
	duration: 0.6,
};

export const mobileMenuVariants: Variants = {
	hidden: {
		opacity: 0,
		x: 30,
		filter: "blur(2px)",
	},
	visible: (i: number) => ({
		opacity: 1,
		x: 0,
		filter: "blur(0px)",
		transition: {
			delay: i * 0.08,
			type: "spring",
			stiffness: 200,
			damping: 20,
			mass: 0.6,
		},
	}),
};
