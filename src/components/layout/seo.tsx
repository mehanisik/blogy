interface SEOProps {
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	url?: string;
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
	keywords = [],
	image,
	url,
	type = "website",
	author,
	publishedTime,
	modifiedTime,
	canonicalUrl,
	noIndex = false,
}: SEOProps) => {
	const siteTitle = `${title} | Blogy`;
	const siteImage = image || "/logo.svg";
	const siteUrl =
		url || (typeof window !== "undefined" ? window.location.href : "");

	return (
		<>
			<title>{siteTitle}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords.join(", ")} />
			{author && <meta name="author" content={author} />}
			<meta
				name="robots"
				content={noIndex ? "noindex, nofollow" : "index, follow"}
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

			<meta property="og:title" content={siteTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			{siteUrl && <meta property="og:url" content={siteUrl} />}
			<meta property="og:image" content={siteImage} />
			<meta property="og:site_name" content="Blogy" />
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
			<meta name="twitter:title" content={siteTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={siteImage} />

			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": type === "article" ? "Article" : "WebSite",
					name: siteTitle,
					description: description,
					url: siteUrl,
					...(type === "article" && {
						author: author
							? {
									"@type": "Person",
									name: author,
								}
							: undefined,
						datePublished: publishedTime,
						dateModified: modifiedTime,
					}),
				})}
			</script>
		</>
	);
};
