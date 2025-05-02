import { Loader2 } from "lucide-react";

export function PendingComponent() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-6 min-h-[60vh] animate-fade-in">
			<Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
			<h1 className="text-2xl font-semibold text-gray-800">Loading...</h1>
			<p className="text-sm text-gray-500">
				Please wait while we load the content.
			</p>
		</div>
	);
}
