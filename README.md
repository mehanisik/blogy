# Personal Website

![Blogy Landing Page](./public/landing-page.png)

A personal blog and portfolio platform I built with Astro 5, React 19, and Tailwind CSS 4. This is my personal corner of the internet where I share:
- **Blog posts** about software development, technology, and my experiences
- **Portfolio projects** I've worked on
- **Academic publications** and research
- **Coding activity** tracked through WakaTime
- **Thoughts and insights** from my journey as a developer

The platform features a clean admin interface for content management, built with modern web technologies for optimal performance and developer experience.

---

## Tech Stack 

- **Astro 5** - Web Framework
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **GSAP** - Animations
- **Three.js** - 3D Graphics
- **Supabase** - Backend-as-a-Service
- **Biome** - Linter and Formatter

---

### Lighthouse

![Lighthouse](./public/lighthouse-score.png)




## Getting Started

### Prerequisites
- Node.js 18+
- Bun runtime
- Supabase account
- GitHub and WakaTime API keys

### Setup
```bash
# Clone and install
git clone https://github.com/mehanisik/blogy.git
cd blogy
bun install

# Environment configuration
cp .env.example .env
```

Configure your environment variables:
```env
PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

```bash
# Start development
bun run dev
```

Visit [http://localhost:4321](http://localhost:4321) to see the site.


---

## Development Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run check` | Run type and code checks |
| `bun run check:fix` | Fix linting issues |

---

## Deployment

I deploy this site on Vercel for its excellent Astro support and edge performance.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Make sure to set all environment variables in your Vercel project settings.




## Contributing

While this is my personal project, I welcome contributions from the community. If you find bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

---







