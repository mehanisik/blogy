"use client";

import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
	const { pending } = useLinkStatus();
	return pending ? (
		<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary" />
	) : null;
}
