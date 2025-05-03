import { NAV_ITEMS } from "@/constants/nav-items.constant";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../theme-toggle";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="max-w-3xl mx-auto w-full border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
			<div className="flex flex-row justify-between items-center py-4 transition-all duration-500 ease-in-out">
				<div className="hidden md:flex gap-8">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transition-all duration-300 ease-out"
							activeProps={{
								className: "text-red-500 dark:text-red-400 font-bold",
							}}
						>
							{item.name}
						</Link>
					))}
				</div>

				{/* Mobile menu button */}
				<button
					type="button"
					className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>

				<div className="transition-transform duration-300 hover:rotate-6">
					<ThemeToggle />
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden py-4 space-y-4 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className="block text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transition-all duration-300 ease-out"
							activeProps={{
								className: "text-red-500 dark:text-red-400 font-bold",
							}}
							onClick={() => setIsMenuOpen(false)}
						>
							{item.name}
						</Link>
					))}
				</div>
			)}
		</nav>
	);
}
