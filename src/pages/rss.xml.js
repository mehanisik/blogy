import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";
import { getWritings } from "../lib/api";

export async function GET(context) {
  const writings = await getWritings();

  const blogPosts = writings.filter((post) => post.type === "blog");

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: blogPosts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      description: post.description || "",
      link: `/blog/${post.slug}/`,
    })),
  });
}
