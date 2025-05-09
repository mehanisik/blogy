import supabase from "@/db";
import type { Project, Publication } from "@/types/database.types";
import { createServerFn } from "@tanstack/react-start";
import { handleSupabaseError } from "./supabase-error";

export const fetchPublicationsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const { data } = await supabase
				.from("publications")
				.select("*")
				.order("date", { ascending: false });

			return data as Publication[];
		} catch (err) {
			handleSupabaseError(err);
		}
	},
);

export const fetchProjectsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const { data } = await supabase.from("projects").select("*");

			return data as Project[];
		} catch (err) {
			handleSupabaseError(err);
		}
	},
);
