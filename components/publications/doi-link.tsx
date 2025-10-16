"use client";

import { Link as LinkIcon } from "lucide-react";

export function DoiLink({ doi }: { doi: string }) {
	const href = doi.startsWith("http") ? doi : `https://doi.org/${doi}`;
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-1 font-mono text-muted-foreground hover:text-foreground transition-colors"
			onClick={(e) => e.stopPropagation()}
		>
			<LinkIcon className="w-3 h-3" />
			{href}
		</a>
	);
}
