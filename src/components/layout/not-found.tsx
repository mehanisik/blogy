import { Link } from "@tanstack/react-router";

export function NotFoundComponent() {
	return (
		<div className="min-h-screen w-full bg-white dark:bg-[#1d1d1d] flex flex-col items-center justify-center text-center cursor-pointer text-neutral-900 dark:text-neutral-100 px-4">
			<div className="flex text-[170px] font-bold">
				<h1 className="mr-4 transition-transform duration-300 drop-shadow-[14px_2px_0_#ff0000] dark:drop-shadow-[14px_2px_0_#ff5555] hover:scale-110 hover:rotate-12 hover:drop-shadow-[14px_2px_0_#ffffff] dark:hover:drop-shadow-[14px_2px_0_#cccccc]">
					4
				</h1>
				<h1 className="mr-4 transition-transform duration-300 drop-shadow-[14px_2px_0_#ff0000] dark:drop-shadow-[14px_2px_0_#ff5555] hover:scale-110 hover:rotate-12 hover:drop-shadow-[14px_2px_0_#ffffff] dark:hover:drop-shadow-[14px_2px_0_#cccccc]">
					0
				</h1>
				<h1 className="transition-transform duration-300 drop-shadow-[14px_2px_0_#ff0000] dark:drop-shadow-[14px_2px_0_#ff5555] hover:scale-110 hover:rotate-12 hover:drop-shadow-[14px_2px_0_#ffffff] dark:hover:drop-shadow-[14px_2px_0_#cccccc]">
					4
				</h1>
			</div>

			<h2 className="text-2xl font-semibold mt-6">404 - Not Found</h2>
			<p className="text-sm mt-2">The page you're looking for doesn't exist.</p>

			<Link
				to="/"
				className="mt-4 px-6 py-2 border rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
			>
				Go to Homepage
			</Link>
		</div>
	);
}
