import Markdown from "@/components/markdown";
import { useState } from "react";

interface MarkdownEditorProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function MarkdownEditor({
	value,
	onChange,
	className,
}: MarkdownEditorProps) {
	const [preview, setPreview] = useState<boolean>(false);

	return (
		<div className={`flex flex-col gap-4 ${className}`}>
			<div className="flex justify-end">
				<button
					type="button"
					onClick={() => setPreview(!preview)}
					className="px-3 py-1 text-sm border rounded"
				>
					{preview ? "Edit" : "Preview"}
				</button>
			</div>
			{preview ? (
				<Markdown content={value} />
			) : (
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full h-full min-h-[400px] p-4 border dark:bg-zinc-900 rounded font-mono text-sm dark:text-white "
					placeholder="Write your markdown here..."
				/>
			)}
		</div>
	);
}
