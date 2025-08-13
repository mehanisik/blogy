"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers";
import { cn } from "@/utils/helpers";
import LoadingLink from "../common/loading-link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
	{ href: "/projects", label: "Projects" },
	{ href: "/publications", label: "Publications" },
	{ href: "/tracker", label: "Tracker" },
	{ href: "/posts", label: "Posts" },
] as const;

export default function Navbar() {
	const pathname = usePathname();
	const { user, signOut } = useAuth();

	return (
		<header className="w-full h-16 border-b border-border">
			<div className="flex items-center justify-between h-full">
				<div className="flex items-center gap-2">
					<Link href={"/"}>
						<span className="sr-only">mehanisik</span>
						<Logo
							size="lg"
							className="h-9 sm:h-10 w-auto hover:opacity-75 transition-opacity duration-100"
						/>
					</Link>

					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((item) => {
							const isActive = pathname.startsWith(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"text-sm text-muted-foreground transition-colors relative flex items-center gap-2 hover:text-foreground",
										isActive && "text-foreground",
									)}
								>
									{item.label}
									<LoadingLink />
								</Link>
							);
						})}
					</div>
				</div>

				<div className="flex items-center gap-4">
					<ModeToggle />

					<MobileMenu navLinks={navLinks} />
					{user?.email && (
						<Link
							href="/auth"
							onClick={() => signOut()}
							className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							<LogOut className="w-4 h-4" />
							Sign out
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
