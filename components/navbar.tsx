import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
	{ href: "/projects", label: "Projects" },
	{ href: "/publications", label: "Publications" },
	{ href: "/posts", label: "Posts" },
	{ href: "/bookmarks", label: "Bookmarks" },
	{ href: "/tracker", label: "Tracker" },
] as const;

export default function Navbar() {
	return (
		<header className="max-w-3xl mx-auto h-20 px-4 transition-colors duration-200">
			<nav className="flex flex-row justify-between items-center py-4 transition-all duration-500 ease-in-out">
				<div className="flex items-center gap-2">
					<Link
						href="/"
						className="text-xl  font-bold text-foreground-secondary hover:opacity-80 transition-opacity"
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
							aria-label="M Logo"
						>
							<path d="M4 4v16h4l4-6 4 6h4V4h-4v8l-4-6-4 6V4H4z" />
						</svg>
					</Link>
				</div>
				<div className="flex items-center gap-6">
					<div className="hidden md:flex gap-8">
						{navLinks.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-base text-foreground-secondary hover:text-foreground hover:underline underline-offset-4 transition-all duration-300 ease-out"
							>
								{item.label}
							</Link>
						))}
					</div>
					<MobileMenu navLinks={navLinks} />
					<div className="transition-transform duration-300 hover:rotate-6">
						<ModeToggle />
					</div>
				</div>
			</nav>
		</header>
	);
}
