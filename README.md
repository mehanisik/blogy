# blogy

Personal site and blog. Astro 5, static, zero runtime JS bundles.

## Stack

- Astro 5, TypeScript
- Markdown content collections (glob loader)
- Instrument Serif + JetBrains Mono (self-hosted via fontsource)
- Biome for lint + format

## Dev

```
bun install
bun run dev
bun run build
```

## Structure

- `src/pages/` — routes (home, blog post, rss, 404)
- `src/content/writings/` — blog posts (markdown + frontmatter)
- `src/components/` — hero, projects, writing list, footer
- `src/data/portfolio.ts` — static content (hero, projects)
- `src/styles/global.css` — design tokens + all styling

## Content

Add a new post by dropping a `.md` file into `src/content/writings/` with this frontmatter:

```yaml
---
title: post title
date: 2026-01-01
type: blog
description: optional one-liner
tags: [optional, list]
---
```
