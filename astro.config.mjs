import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://mehanisik.is-a.dev",
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
