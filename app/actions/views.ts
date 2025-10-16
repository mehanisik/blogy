"use server";

import { revalidateTag } from "next/cache";
import { supabaseServer } from "@/utils/supabase/server";

export async function incrementView(slug: string) {
	const supabase = await supabaseServer();
	await supabase.rpc("increment_blog_view", { blog_slug: slug });
	revalidateTag(`post-by-slug-${slug}`);
}
