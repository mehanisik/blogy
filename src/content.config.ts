import { defineCollection, z } from "astro:content";

import hljs from "highlight.js";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { getWritings } from "./lib/api";

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

const writings = defineCollection({
  loader: {
    name: "supabase-writings",
    load: async ({ store }) => {
      const posts = await getWritings();
      for (const post of posts) {
        if ((post.type === "blog" || post.type === "paper") && post.slug) {
          const content = post.content || "";
          const html = await marked.parse(content);

          store.set({
            id: post.slug,
            data: post,
            rendered: { html },
          });
        }
      }
    },
  },
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    date: z.string(),
    content: z.string().nullable().optional(),
    cover_image: z.string().nullable().optional(),
    metadata: z.any().optional(),
  }),
});

export const collections = {
  writings,
};
