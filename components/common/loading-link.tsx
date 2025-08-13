"use client";

import { Loader2 } from "lucide-react";
import { useLinkStatus } from "next/link";

export default function LoadingLink() {
	const { pending } = useLinkStatus();

	return pending ? (
		<span className="animate-pulse">
			<Loader2 size={12} className="animate-spin" />
		</span>
	) : null;
}
