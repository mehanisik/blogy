import { Ban } from "lucide-react";

export function NotFoundComponent() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-6 min-h-[60vh] animate-fade-in">
			<Ban className="w-8 h-8 text-gray-500" />
			<h1 className="text-2xl font-semibold text-gray-800">404 - Not Found</h1>
			<p className="text-sm text-gray-500">
				The page you're looking for doesn't exist.
			</p>
		</div>
	);
}
