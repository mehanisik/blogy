import { Suspense } from "react";
import { PageLayout } from "@/components/page-layout";
import { getPublications } from "@/utils/data";
import PublicationsLoading from "./loading";
import { PublicationsContent } from "./publications-content";

export const revalidate = 3600;

export default async function PublicationsPage() {
	const publications = await getPublications();

	return (
		<Suspense fallback={<PublicationsLoading />}>
			<PageLayout>
				<PublicationsContent publications={publications} />
			</PageLayout>
		</Suspense>
	);
}
