import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";

export async function GET(context) {
  const writings = await getCollection("writings");
  const blogPosts = writings
    .filter((entry) => entry.data.type === "blog")
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: blogPosts.map((entry) => ({
      title: entry.data.title,
      pubDate: new Date(entry.data.date),
      description: entry.data.description || "",
      link: `/blog/${entry.id}/`,
    })),
  });
}
