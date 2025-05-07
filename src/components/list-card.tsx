import { useNavigate } from "@tanstack/react-router";

interface ListCardProps {
	title: string;
	date?: string;
	description?: string;
	tags?: string[];
	type: "project" | "blog" | "publication";
	link: string;
	blogId?: number;
}

export function ListCard({
	title,
	date,
	description,
	tags = [],
	type,
	link,
	blogId,
}: ListCardProps) {
	const navigate = useNavigate();

	const handleBlogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (type === "blog" && blogId) {
			navigate({ to: `/blogs/${blogId}` });
		}
	};

	const isBlog = type === "blog" && blogId;
	const isExternal = type === "project" || type === "publication";
	const href = isBlog ? `/blogs/${blogId}` : link;

	return (
		<article className="p-4 sm:p-5 flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-b border-gray-200 dark:border-[#313131]">
			<a
				href={href}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
				onClick={isBlog ? handleBlogClick : undefined}
				className="block w-full text-left focus:outline-none rounded-lg transition-colors"
				aria-label={title}
			>
				{date && (
					<time className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
						{date}
					</time>
				)}
				<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 transition-colors">
					{title}
				</h2>
				{description && (
					<p className="text-base text-gray-700 dark:text-gray-300 mb-2 transition-colors">
						{description}
					</p>
				)}
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-3">
						{tags.map((tag) => (
							<span
								key={tag}
								className="inline-block rounded bg-[#E5E7EB] dark:bg-[#313131] text-sm text-gray-700 dark:text-gray-300 px-3 py-1 font-medium transition-colors"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</a>
		</article>
	);
}

export default ListCard;
