import { NAV_ITEMS } from "@/constants/nav-items.constant";
import { Link } from "@tanstack/react-router";
import ThemeToggle from "../theme-toggle";

export default function Header() {
	return (
		<nav className="max-w-3xl mx-auto  py-4 flex flex-row justify-between items-center">
			<div className="flex gap-5">
				{NAV_ITEMS.map((item) => (
					<Link
						key={item.name}
						to={item.href}
						className="text-base text-gray-700 hover:text-gray-900"
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
			<ThemeToggle />
		</nav>
	);
}
