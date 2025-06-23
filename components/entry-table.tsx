import Link from "next/link";

interface Entry {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	read_time: string;
	slug: string;
	published: boolean;
	tags: string[];
}

interface EntryTableProps {
	entries: Entry[];
}

export function EntryTable({ entries }: EntryTableProps) {
	return (
		<div className="grid gap-6">
			{entries.map((entry) => (
				<Link
					key={entry.id}
					href={entry.slug ? `/posts/${entry.slug}` : `/posts/${entry.id}`}
					className="block"
				>
					<article className="group border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-sm cursor-pointer">
						<div className="space-y-4">
							<div className="space-y-2">
								<h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
									{entry.title}
								</h2>
								<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
									{entry.excerpt}
								</p>
							</div>

							{entry.tags && entry.tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{entry.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
										>
											{tag}
										</span>
									))}
								</div>
							)}

							<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
								<span>
									{new Date(entry.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
								<span>•</span>
								<span>{entry.read_time}</span>
								{entry.published && (
									<>
										<span>•</span>
										<span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs">
											Published
										</span>
									</>
								)}
							</div>
						</div>
					</article>
				</Link>
			))}
		</div>
	);
}
