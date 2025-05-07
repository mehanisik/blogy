import appCss from "../styles/app.css?url";

export const Links = [
	{ rel: "stylesheet", href: appCss },
	{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
	{
		rel: "icon",
		type: "image/png",
		sizes: "192x192",
		href: "/android-chrome-192x192.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "512x512",
		href: "/android-chrome-512x512.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "16x16",
		href: "/favicon-16x16.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "32x32",
		href: "/favicon-32x32.png",
	},
	{ rel: "manifest", href: "/site.webmanifest" },
];
