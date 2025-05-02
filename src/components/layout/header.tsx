import { NAV_ITEMS } from "@/constants/nav-items.constant";
import { Link } from "@tanstack/react-router";
import ThemeToggle from "../theme-toggle";

export default function Header() {
	return (
		<nav className="max-w-3xl mx-auto w-full flex flex-row justify-between items-center py-4 transition-all duration-500 ease-in-out">
			<div className="flex gap-8">
				{NAV_ITEMS.map((item) => (
					<Link
						key={item.name}
						to={item.href}
						className="text-base hover:scale-105 transition-all duration-300 ease-out"
						activeProps={{
							style: {
								color: "red",
								fontWeight: "bold",
							},
						}}
					>
						{item.name}
					</Link>
				))}
			</div>
			<div className="transition-transform duration-300 hover:rotate-6">
				<ThemeToggle />
			</div>
		</nav>
	);
}
