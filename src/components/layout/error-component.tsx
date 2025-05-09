import { Link, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { ArrowLeft, RefreshCw } from "lucide-react";

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
	const router = useRouter();

	const errorContent = {
		title: "Something went wrong",
		message: error?.message || "An unexpected error occurred.",
		tryAgain: true,
	};

	return (
		<div className="min-h-screen w-full bg-white dark:bg-[#1d1d1d] flex flex-col items-center justify-center text-center text-neutral-900 dark:text-neutral-100 px-4">
			<div className="flex text-[100px] font-bold">
				{["E", "R", "R", "O", "R"].map((char) => (
					<h1
						key={char}
						className="mr-2 transition-transform duration-300 drop-shadow-[8px_2px_0_#ff0000] dark:drop-shadow-[8px_2px_0_#ff5555] hover:scale-110 hover:rotate-12 hover:drop-shadow-[8px_2px_0_#ffffff] dark:hover:drop-shadow-[8px_2px_0_#cccccc]"
					>
						{char}
					</h1>
				))}
			</div>

			<h2 className="text-2xl font-semibold mt-6">{errorContent.title}</h2>
			<p className="text-sm mt-2">{errorContent.message}</p>

			<div className="flex flex-wrap justify-center gap-3 pt-6">
				<Link
					to="/"
					className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition"
				>
					<ArrowLeft size={16} />
					Go Back
				</Link>
				{errorContent.tryAgain && (
					<button
						type="button"
						onClick={() => router.invalidate()}
						className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border border-neutral-600 text-neutral-800 dark:text-neutral-200 dark:border-neutral-500 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
					>
						<RefreshCw size={16} />
						Try Again
					</button>
				)}
			</div>
		</div>
	);
};
