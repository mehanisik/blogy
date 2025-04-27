import { NAV_ITEMS } from "@/constants/nav-items.constant";
import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="py-4">
			<nav className="flex flex-row space-x-6">
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
			</nav>
		</header>
	);
}
