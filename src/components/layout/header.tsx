import { NAV_ITEMS } from "@/constants/nav-items.constant";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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

				<div className="flex items-center gap-4">
					<div className="group relative md:hidden">
						<input type="checkbox" id="menu-toggle" className="peer hidden" />
						<label
							htmlFor="menu-toggle"
							className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200 cursor-pointer"
							aria-expanded="false"
							aria-label="Toggle menu"
							aria-controls="mobile-menu"
						>
							<Menu
								className="h-6 w-6 peer-checked:hidden"
								aria-hidden="true"
							/>
							<X
								className="h-6 w-6 hidden peer-checked:block"
								aria-hidden="true"
							/>
						</label>

						<div
							id="mobile-menu"
							className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-200 ease-in-out transform translate-y-1 peer-checked:translate-y-0"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-toggle"
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
										role="menuitem"
										aria-current={
											item.href === window.location.pathname
												? "page"
												: undefined
										}
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
