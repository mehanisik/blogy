"use client";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers";
import { cn } from "@/utils/helpers";
import { navLinkVariants } from "@/utils/motion/variants";
import LoadingLink from "../common/loading-link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
	{ href: "/projects", label: "Projects" },
	{ href: "/publications", label: "Publications" },
	{ href: "/posts", label: "Posts" },
] as const;

export default function Navbar() {
	const pathname = usePathname();
	const { user, signOut } = useAuth();

	return (
		<header className="w-full h-16 border-b border-border">
			<div className="max-w-7xl mx-auto px-4 md:px-0 py-3">
				<div className="flex items-center justify-between h-full">
					<div className="flex items-center gap-8">
						<Link href="/" className="flex items-center">
							<span className="sr-only">mehanisik</span>
							<Logo
								size="lg"
								className="h-9 sm:h-10 w-auto hover:opacity-80 transition-opacity duration-200"
							/>
						</Link>

						<nav className="hidden md:flex items-center space-x-8">
							{navLinks.map((item) => {
								const isActive = pathname.startsWith(item.href);
								return (
									<Link key={item.href} href={item.href}>
										<motion.span
											className={cn(
												"text-sm font-medium relative flex items-center gap-2 transition-colors duration-200",
												isActive
													? "text-foreground"
													: "text-muted-foreground hover:text-foreground",
											)}
											variants={navLinkVariants}
											initial="initial"
											animate={isActive ? "active" : "initial"}
											whileHover="hover"
										>
											{item.label}
											<LoadingLink />
										</motion.span>
									</Link>
								);
							})}
						</nav>
					</div>

					<div className="flex items-center gap-4">
						{user?.email && (
							<Link
								href="/auth"
								onClick={() => signOut()}
								className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
							>
								<LogOut className="w-4 h-4" />
								Sign out
							</Link>
						)}

						<ModeToggle />

						<div className="md:hidden">
							<MobileMenu navLinks={navLinks} />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
