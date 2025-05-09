import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownProps {
	content: string;
}

export function Markdown({ content }: MarkdownProps) {
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
						customStyle={{
							backgroundColor: "#1e1e1e",
							padding: "1rem",
							borderRadius: "0.5rem",
							border: "1px solid #444",
						}}
					>
						{String(children).replace(/\n$/, "")}
					</SyntaxHighlighter>
				);
			}
			return (
				<code className="px-1.5 py-0.5 rounded text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
					{children}
				</code>
			);
		},
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-gray-100">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-bold mb-5 mt-7 text-gray-900 dark:text-gray-100">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-100">
				{children}
			</h3>
		),
		p: ({ children }) => (
			<p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
				{children}
			</p>
		),
		ul: ({ children }) => (
			<ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
				{children}
			</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
				{children}
			</ol>
		),
		li: ({ children }) => (
			<li className="mb-1 text-gray-700 dark:text-gray-300">{children}</li>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
				{children}
			</blockquote>
		),
		a: ({ children, href }) => (
			<a
				href={href}
				className="text-blue-600 dark:text-blue-400 hover:underline"
			>
				{children}
			</a>
		),
		img: ({ src, alt }) => (
			<img
				src={src}
				alt={alt}
				className="rounded-lg my-4 max-w-full h-auto border border-gray-200 dark:border-gray-700"
			/>
		),
	};

	return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}

export default Markdown;
