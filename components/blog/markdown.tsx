import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/dark.css";
import Image from "next/image";
import { cn } from "@/utils/helpers";

export function Markdown({ content }: { content: string }) {
	return (
		<div className="max-w-none">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}
				components={{
					h1: (props) => (
						<h1
							className="text-3xl font-bold text-foreground mt-8 mb-4"
							{...props}
						/>
					),
					h2: (props) => (
						<h2
							className="text-2xl font-semibold text-foreground mt-6 mb-3"
							{...props}
						/>
					),
					h3: (props) => (
						<h3
							className="text-xl font-semibold text-foreground mt-5 mb-2"
							{...props}
						/>
					),
					h4: (props) => (
						<h4
							className="text-lg font-semibold text-foreground mt-4 mb-2"
							{...props}
						/>
					),
					h5: (props) => (
						<h5
							className="text-base font-semibold text-foreground mt-3 mb-1"
							{...props}
						/>
					),
					h6: (props) => (
						<h6
							className="text-sm font-semibold text-foreground mt-3 mb-1"
							{...props}
						/>
					),
					p: (props) => (
						<p className="text-foreground leading-relaxed mb-4" {...props} />
					),
					a: (props) => (
						<a
							{...props}
							className="text-primary underline hover:text-primary/80 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						/>
					),
					code({ className, children, ...props }) {
						const isInline = !className;
						if (isInline) {
							return (
								<code
									className="bg-muted px-1 py-0.5 rounded text-sm font-mono"
									{...props}
								>
									{children}
								</code>
							);
						}
						return (
							<pre
								className={cn(
									"rounded-lg bg-[#303030] p-4 overflow-x-auto border border-border my-4",
									className,
								)}
							>
								<code className="text-sm font-mono">{children}</code>
							</pre>
						);
					},
					blockquote: (props) => (
						<blockquote
							className="border-l-4 border-primary/60 pl-4 italic text-muted-foreground my-4 bg-muted/50 py-2 rounded-r"
							{...props}
						/>
					),
					ul: (props) => (
						<ul
							className="list-disc list-outside pl-6 my-4 text-foreground"
							{...props}
						/>
					),
					ol: (props) => (
						<ol
							className="list-decimal list-outside pl-6 my-4 text-foreground"
							{...props}
						/>
					),
					li: (props) => <li className="mb-2 text-foreground" {...props} />,
					table: (props) => (
						<div className="overflow-x-auto my-6">
							<table
								className="w-full border-collapse border border-border rounded-lg"
								{...props}
							/>
						</div>
					),
					th: (props) => (
						<th
							className="border border-border px-4 py-2 bg-muted font-semibold text-foreground text-left"
							{...props}
						/>
					),
					td: (props) => (
						<td
							className="border border-border px-4 py-2 text-foreground"
							{...props}
						/>
					),
					img: (props) => (
						<div className="my-6 flex justify-center">
							<Image
								src={props.src as string}
								width={(props.width as number) || 800}
								height={(props.height as number) || 600}
								className="rounded-lg max-h-96 object-contain border border-border shadow-sm"
								alt={props.alt || `Image from ${props.src}`}
							/>
						</div>
					),
					hr: (props) => <hr className="my-8 border-border" {...props} />,
					strong: (props) => (
						<strong className="font-semibold text-foreground" {...props} />
					),
					em: (props) => <em className="italic text-foreground" {...props} />,
					del: (props) => (
						<del className="line-through text-muted-foreground" {...props} />
					),
					pre: (props) => (
						<pre
							className="bg-[#303030] p-4 rounded-lg overflow-x-auto border border-border my-4"
							{...props}
						/>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
