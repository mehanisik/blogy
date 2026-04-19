import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mehanisik.is-a.dev",
  integrations: [sitemap()],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
