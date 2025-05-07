interface SEOProps {
	title: string;
	description: string;
	image?: string;
	type?: "website" | "article" | "profile";
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	canonicalUrl?: string;
	noIndex?: boolean;
}

export const SEO = ({
	title,
	description,
	image = "/logo.svg",
	type = "website",
	author,
	publishedTime,
	modifiedTime,
	canonicalUrl,
	noIndex = false,
}: SEOProps) => {
	const fullTitle = `${title} | mehanisik`;

	const structuredData = {
		"@context": "https://schema.org",
		"@type": type === "article" ? "Article" : "WebSite",
		name: fullTitle,
		description,
		...(type === "article" && {
			headline: title,
			mainEntityOfPage: canonicalUrl,
			author: author && {
				"@type": "Person",
				name: author,
			},
			datePublished: publishedTime,
			dateModified: modifiedTime,
		}),
	};

	return (
		<>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			{author && <meta name="author" content={author} />}
			<meta
				name="robots"
				content={noIndex ? "noindex, nofollow" : "index, follow"}
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:image" content={image} />
			<meta property="og:site_name" content="mehanisik" />
			{type === "article" && (
				<>
					{author && <meta property="article:author" content={author} />}
					{publishedTime && (
						<meta property="article:published_time" content={publishedTime} />
					)}
					{modifiedTime && (
						<meta property="article:modified_time" content={modifiedTime} />
					)}
				</>
			)}

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

			<script type="application/ld+json">
				{JSON.stringify(structuredData)}
			</script>
		</>
	);
};
