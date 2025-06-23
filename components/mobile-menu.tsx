"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavLink {
	href: string;
	label: string;
}

interface MobileMenuProps {
	navLinks: readonly NavLink[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);
	const handleClose = () => setIsOpen(false);

	return (
		<div className="md:hidden">
			<button
				type="button"
				className="p-2 outline-none cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200"
				aria-label="Toggle menu"
				aria-expanded={isOpen}
				onClick={handleToggle}
			>
				<Menu className="w-6 h-6" />
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
					<div className="py-1">
						{navLinks.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
								onClick={handleClose}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
