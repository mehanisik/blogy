import MarkdownPreview from "@uiw/react-markdown-preview";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownProps {
	content: string;
}

export function Markdown({ content }: MarkdownProps) {
	return (
		<article className="prose prose-invert max-w-none">
			<MarkdownPreview
				source={content}
				style={{
					backgroundColor: "transparent",
					...vscDarkPlus,
				}}
			/>
		</article>
	);
}
