import type React from "react";

export interface ListCardProps {
	title: string;
	date: string;
	description: string;
	tags?: string[];
	rightAction?: React.ReactNode;
}

const ListCard: React.FC<ListCardProps> = ({
	title,
	date,
	description,
	tags = [],
	rightAction,
}) => {
	return (
		<article className="flex items-start justify-between border-b border-gray-200 pb-5 group cursor-pointer hover:rotate-1">
			<div className="flex-1 min-w-0">
				<time className="text-sm text-gray-500 dark:text-gray-400">{date}</time>
				<h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
					{title}
				</h2>
				<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
					{description}
				</p>
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
			{rightAction && (
				<div className="ml-6 h-full flex-shrink-0 flex items-center justify-center">
					{rightAction}
				</div>
			)}
		</article>
	);
};

export default ListCard;
