import {
	ArrowRight,
	Brain,
	Cloud,
	Code,
	Database,
	FileText,
	GraduationCap,
	Link as LinkIcon,
	Server,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import type { Tables } from "@/types/supabase";
import { formatMonthYearShort } from "@/utils/helpers/date";
import {
	classifyKeyword,
	getThesisLabel,
	type KeywordCategory,
} from "@/utils/helpers/publications";
import { MotionCard, MotionContainer } from "@/utils/motion/motion-components";

export function PublicationsList({
	publications,
}: {
	publications: Tables<"publications">[];
}) {
	if (!publications || publications.length === 0) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-muted-foreground">No publications found</p>
			</div>
		);
	}

	const keywordIcons: Record<KeywordCategory, React.ReactNode> = {
		web: <Code className="h-3 w-3" />,
		database: <Database className="h-3 w-3" />,
		ai: <Brain className="h-3 w-3" />,
		server: <Server className="h-3 w-3" />,
		cloud: <Cloud className="h-3 w-3" />,
		other: null,
	};

	return (
		<MotionContainer className="w-full py-5 min-h-[72vh]">
			{publications.map((p) => (
				<Link
					key={p.id}
					href={`/publications/${p.id}`}
					className="block group mb-4"
				>
					<MotionCard className="border border-muted hover:border-muted-foreground/20 rounded-xl shadow-none cursor-pointer">
						<CardContent className="p-4 sm:p-5 flex gap-4">
							{p.cover_image && (
								<div className="relative hidden sm:block w-28 h-36 rounded-lg overflow-hidden bg-background">
									<Image
										src={p.cover_image}
										alt={`${p.title} cover`}
										fill
										className="object-contain"
									/>
								</div>
							)}
							<div className="flex-1 flex flex-col gap-3 min-w-0">
								<div className="flex items-start justify-between gap-2">
									<h3 className="text-base sm:text-lg font-medium tracking-tight text-foreground line-clamp-2 group-hover:opacity-80">
										{p.title}
									</h3>
									<ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
								</div>
								{p.description && (
									<p className="text-sm text-muted-foreground line-clamp-2">
										{p.description}
									</p>
								)}
								<div className="flex flex-wrap gap-1.5">
									{getThesisLabel(p) && (
										<Badge variant="secondary" className="font-normal">
											<GraduationCap className="h-3 w-3" />
											{getThesisLabel(p)}
										</Badge>
									)}
									{(p.keywords ?? []).map((kw) => {
										const k = kw.trim();
										const icon = keywordIcons[classifyKeyword(k)];
										return (
											<Badge
												key={`${p.id}-${k}`}
												variant="outline"
												className="font-normal"
											>
												{icon}
												{k}
											</Badge>
										);
									})}
								</div>
								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
									{p.authors && (
										<span className="truncate max-w-[60ch]">{p.authors}</span>
									)}
									{p.date && <span>{formatMonthYearShort(p.date)}</span>}
									{p.page_count ? (
										<span className="inline-flex items-center gap-1">
											<FileText className="w-3 h-3" />
											{p.page_count} pages
										</span>
									) : null}
									{p.doi && (
										<a
											href={
												p.doi.startsWith("http")
													? p.doi
													: `https://doi.org/${p.doi}`
											}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 font-mono text-muted-foreground hover:text-foreground transition-colors"
											onClick={(e) => e.stopPropagation()}
										>
											<LinkIcon className="w-3 h-3" />
											{p.doi.startsWith("http")
												? p.doi
												: `https://doi.org/${p.doi}`}
										</a>
									)}
									{p.pdf && (
										<span className="inline-flex items-center gap-1">
											<FileText className="w-3 h-3" />
											PDF available
										</span>
									)}
								</div>
							</div>
						</CardContent>
					</MotionCard>
				</Link>
			))}
		</MotionContainer>
	);
}
