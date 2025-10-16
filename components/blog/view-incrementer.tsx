"use client";

import { useEffect } from "react";
import { incrementView } from "@/app/actions/views";

export function ViewIncrementer({ slug }: { slug: string }) {
	useEffect(() => {
		incrementView(slug);
	}, [slug]);

	return null;
}
