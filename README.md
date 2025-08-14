# Personal Website

![Blogy Landing Page](./public/landing.png)

A personal blog and portfolio platform I built with Next.js 15, TypeScript, and Supabase. This is my personal corner of the internet where I share:
- **Blog posts** about software development, technology, and my experiences
- **Portfolio projects** I've worked on
- **Academic publications** and research
- **Coding activity** tracked through WakaTime
- **Thoughts and insights** from my journey as a developer

The platform features a clean admin interface for content management, built with modern web technologies for optimal performance and developer experience.

---

## Tech Stack 

- **Next.js 15** - React Framework 
- **React 19** - JS library for UI
- **TypeScript** - Type safety 
- **Tailwind CSS** - CSS framework
- **Shadcn/ui** - UI library
- **Supabase** - Backend-as-a-Service 
- **Biome** - Linter and formatter
- **PostHog** - Analytics and insights

---

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- Supabase account
- GitHub and WakaTime API keys

### Setup
```bash
# Clone and install
git clone https://github.com/mehanisik/blogy.git
cd blogy
yarn install

# Environment configuration
cp .env.example .env.local
```

Configure your environment variables:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GITHUB_TOKEN=your_github_token
WAKATIME_API_KEY=your_wakatime_key
POSTHOG_KEY=your_posthog_key
```

```bash
# Start development
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

---



---

## Development Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn format` | Format code with Biome |
| `yarn lint` | Lint code with Biome |
| `yarn typecheck` | Run TypeScript checks |
| `yarn clean` | Clean build artifacts |
| `yarn knip` | Detect unused code |

### Database Commands
| Command | Description |
|---------|-------------|
| `yarn db:types` | Generate TypeScript types |
| `yarn db:push` | Push database migrations |
| `yarn db:migrate` | Create new migration |
| `yarn db:link` | Link to Supabase project |




---

## Deployment

I deploy this site on Vercel for its excellent Next.js support and edge performance.

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







