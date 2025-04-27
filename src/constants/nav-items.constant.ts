import type { NavItem } from "@/types/nav-items";

export const NAV_ITEMS: NavItem[] = [
	{ name: "About", href: "/" },
	{ name: "Projects", href: "/projects" },
	{ name: "Publications", href: "/publications" },
	{ name: "Blogs", href: "/blogs" },
] as const;
