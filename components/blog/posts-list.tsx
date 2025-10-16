import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import type { Tables } from "@/types/supabase";
import { formatMonthYearShort } from "@/utils/helpers/date";
import { MotionCard, MotionContainer } from "@/utils/motion/motion-components";

export const PostsList = async ({ posts }: { posts: Tables<"blogs">[] }) => {
	if (!posts?.length) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-muted-foreground">No posts found</p>
			</div>
		);
	}

	return (
		<MotionContainer className="container mx-auto grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<Link
					key={post.id}
					href={`/posts/${post.slug || post.id}`}
					className="group"
				>
					<MotionCard className="h-full transform border border-muted rounded-xl shadow-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
						<CardContent className="flex h-full flex-col p-5">
							<div className="flex-grow space-y-3">
								<h3 className="text-lg font-medium tracking-tight text-foreground group-hover:opacity-80">
									{post.title}
								</h3>
							</div>

							<div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
								{post.date && <span>{formatMonthYearShort(post.date)}</span>}
								{typeof post.read_time === "number" &&
									post.read_time > 0 && (
										<>
											<span>•</span>
											<span>{post.read_time} min read</span>
										</>
									)}
							</div>

							{post.tags && post.tags.length > 0 && (
								<div className="mt-3 flex flex-wrap gap-1.5">
									{post.tags.slice(0, 3).map((tag) => (
										<Badge
											key={`${post.id}-${tag}`}
											variant="outline"
											className="font-normal text-xs"
										>
											{tag}
										</Badge>
									))}
									{post.tags && post.tags.length > 3 && (
										<Badge
											variant="outline"
											className="font-normal text-xs"
										>
											+{post.tags.length - 3}
										</Badge>
									)}
								</div>
							)}
						</CardContent>
					</MotionCard>
				</Link>
			))}
		</MotionContainer>
	);
};
