"use client";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

const navLinks = [
	{ href: "/projects", label: "Projects" },
	{ href: "/publications", label: "Publications" },
	{ href: "/posts", label: "Posts" },
	{ href: "/tracker", label: "Tracker" },
] as const;

export default function Navbar() {
	const pathname = usePathname();
	return (
		<header className="max-w-4xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
			<nav
				className="flex flex-row justify-between items-center py-3 sm:py-4 transition-all duration-500 ease-in-out"
				aria-label="Main navigation"
			>
				<div className="flex items-center gap-2">
					<Link
						href="/"
						className="text-lg sm:text-xl font-bold text-foreground-secondary hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
						aria-label="Go to homepage"
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-5 h-5 sm:w-6 sm:h-6"
						>
							<path d="M4 4v16h4l4-6 4 6h4V4h-4v8l-4-6-4 6V4H4z" />
						</svg>
					</Link>
				</div>
				<div className="flex items-center gap-4 sm:gap-6">
					<div className="hidden md:flex gap-6 lg:gap-8" role="menubar">
						{navLinks.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`text-sm sm:text-base text-foreground-secondary hover:text-foreground hover:underline  outline-none underline-offset-4 transition-all duration-300 ease-out rounded px-2 py-1 ${pathname.startsWith(item.href) ? "text-red-500 dark:text-red-300 " : ""}`}
								role="menuitem"
								aria-label={`Navigate to ${item.label} page`}
							>
								{item.label}
							</Link>
						))}
					</div>
					<div className="transition-transform duration-300 hover:rotate-6">
						<ModeToggle />
					</div>
					<MobileMenu navLinks={navLinks} />
				</div>
			</nav>
		</header>
	);
}
