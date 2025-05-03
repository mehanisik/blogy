import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
	const [preview, setPreview] = useState(false);

	const components: Components = {
		code({ node, className, children }) {
			const match = /language-(\w+)/.exec(className || "");
			if (match) {
				return (
					<SyntaxHighlighter
						style={vscDarkPlus}
						language={match[1]}
						PreTag="div"
						className="rounded-lg my-4"
					>
						{String(children).replace(/\n$/, "")}
					</SyntaxHighlighter>
				);
			}
			return <code className=" px-1.5 py-0.5 rounded text-sm">{children}</code>;
		},
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold mb-6 mt-8 ">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-bold mb-5 mt-7 ">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl font-bold mb-4 mt-6 ">{children}</h3>
		),
		p: ({ children }) => <p className="mb-4 leading-relaxed ">{children}</p>,
		ul: ({ children }) => (
			<ul className="list-disc pl-6 mb-4 space-y-1 ">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal pl-6 mb-4 space-y-1 ">{children}</ol>
		),
		li: ({ children }) => <li className="mb-1 ">{children}</li>,
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-[var(--foreground)] pl-4 italic my-4 ">
				{children}
			</blockquote>
		),
		a: ({ children, href }) => (
			<a href={href} className=" hover:underline">
				{children}
			</a>
		),
		img: ({ src, alt }) => (
			<img src={src} alt={alt} className="rounded-lg my-4 max-w-full h-auto" />
		),
	};

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
				<ReactMarkdown components={components}>{value}</ReactMarkdown>
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
