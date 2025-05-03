import { NAV_ITEMS } from "@/constants/nav-items.constant";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import ThemeToggle from "../theme-toggle";

export default function Header() {
	return (
		<header className="w-full transition-colors duration-200">
			<nav className="flex flex-row justify-between items-center py-4 transition-all duration-500 ease-in-out">
				<div className="hidden md:flex gap-8">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transition-all duration-300 ease-out"
							activeProps={{
								className: "text-red-500 dark:text-red-400 font-bold",
							}}
							aria-current={
								item.href === window.location.pathname ? "page" : undefined
							}
						>
							{item.name}
						</Link>
					))}
				</div>

				<div className="flex items-center flex-row-reverse gap-4 justify-between w-full">
					<div className="md:hidden">
						<button
							type="button"
							className="p-2 outline-none cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200"
							aria-label="Toggle menu"
							onClick={() => {
								const menu = document.getElementById("mobile-menu");
								if (menu) {
									menu.classList.toggle("hidden");
								}
							}}
						>
							<Menu className="w-6 h-6" />
						</button>

						<div
							id="mobile-menu"
							className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
						>
							<div className="py-1">
								{NAV_ITEMS.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										activeProps={{
											className: "text-red-500 dark:text-red-400 font-bold",
										}}
										onClick={() => {
											const menu = document.getElementById("mobile-menu");
											if (menu) {
												menu.classList.add("hidden");
											}
										}}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>

					<div className="transition-transform duration-300 hover:rotate-6">
						<ThemeToggle />
					</div>
				</div>
			</nav>
		</header>
	);
}
