import type { LinkProps } from "@tanstack/react-router";

export type NavItem = {
	name: string;
	href: LinkProps["to"];
};
