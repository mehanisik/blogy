import Layout from "@/components/layout/layout";
import { fetchBlogById } from "@/services";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Route = createFileRoute("/blogs/$blogId")({
	loader: ({ params: { blogId } }) => fetchBlogById({ data: Number(blogId) }),
	component: BlogPostPage,
});

function BlogPostPage() {
	const post = Route.useLoaderData();

	const formatDate = (dateString?: string) => {
		if (dateString) {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(date);
		}
	};

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
			return <code className="px-1.5 py-0.5 rounded text-sm">{children}</code>;
		},
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-bold mb-5 mt-7">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl font-bold mb-4 mt-6">{children}</h3>
		),
		p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
		ul: ({ children }) => (
			<ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
		),
		li: ({ children }) => <li className="mb-1">{children}</li>,
		blockquote: ({ children }) => (
			<blockquote className="border-l-4  pl-4 italic my-4">
				{children}
			</blockquote>
		),
		a: ({ children, href }) => (
			<a href={href} className="hover:underline">
				{children}
			</a>
		),
		img: ({ src, alt }) => (
			<img src={src} alt={alt} className="rounded-lg my-4 max-w-full h-auto" />
		),
	};

	return (
		<Layout>
			<Link to="/blogs" className="text-sm hover:underline mb-6 inline-block">
				← Back to all posts
			</Link>

			<h1 className="text-4xl font-bold tracking-tight mt-4 mb-3">
				{post?.title}
			</h1>
			<p className="text-sm mb-8">
				{formatDate(post?.date)}
				{post?.tags && (
					<span className="ml-2">
						{post.tags.map((tag) => tag.trim()).join(", ")}
					</span>
				)}
			</p>

			<div className="prose max-w-none">
				<ReactMarkdown components={components}>
					{post?.content || ""}
				</ReactMarkdown>
			</div>
		</Layout>
	);
}
