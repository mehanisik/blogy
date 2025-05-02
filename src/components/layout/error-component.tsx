import { AlertTriangle } from "lucide-react";

type ErrorComponentProps = {
	error: Error;
};

export function ErrorComponent({ error }: ErrorComponentProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-6 min-h-[60vh] animate-fade-in">
			<AlertTriangle className="w-8 h-8 text-red-600" />
			<h1 className="text-2xl font-semibold text-gray-800">
				Something went wrong
			</h1>
			<p className="text-sm text-red-600 text-center max-w-md">
				{error.message}
			</p>
		</div>
	);
}
