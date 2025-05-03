import { ExternalLink, FileText, Github } from "lucide-react";
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
		<article className="p-4 sm:p-5  border border-gray-300  dark:border-gray-800 group hover:border-gray-300 dark:hover:border-gray-700 rounded-lg  dark:bg-gray-950 transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/50">
			<div className="flex flex-col sm:flex-row justify-between items-start gap-4">
				<div className="flex-1 w-full">
					{date && (
						<time className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
							{date}
						</time>
					)}
					<h2 className="font-semibold text-gray-900 dark:text-gray-100 mt-1 text-base sm:text-lg transition-colors duration-200">
						{title}
					</h2>
					<p className="leading-relaxed text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base transition-colors duration-200">
						{description}
					</p>
					{tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-3">
							{tags.map((tag) => (
								<span
									key={tag}
									className="text-xs font-medium border border-gray-200 dark:border-gray-700 py-1 px-2.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-200"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
				{rightAction && (
					<div className="flex-shrink-0 flex items-center min-h-[40px] w-full sm:w-auto justify-end sm:justify-start">
						{rightAction}
					</div>
				)}
			</div>
		</article>
	);
};

export default ListCard;
