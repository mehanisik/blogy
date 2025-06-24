"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
	href: string;
	label: string;
}

interface MobileMenuProps {
	navLinks: readonly NavLink[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<div className="md:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 sm:h-10 sm:w-10"
						aria-label="Open mobile menu"
					>
						<Menu className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-[280px] sm:w-[320px] lg:w-[400px]">
					<SheetHeader>
						<SheetTitle className="text-lg sm:text-xl">Navigation</SheetTitle>
					</SheetHeader>
					<nav className="mt-4 sm:mt-6">
						<ul className="space-y-1 sm:space-y-2">
							{navLinks.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="flex w-full items-center rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-foreground transition-colors hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
										onClick={handleClose}
										aria-label={`Navigate to ${item.label} page`}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
}
