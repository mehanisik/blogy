import type { NavItem } from "@/types/nav-items";

export const NAV_ITEMS: NavItem[] = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/" },
	{ name: "Projects", href: "/" },
	{ name: "Experiences", href: "/" },
] as const;
