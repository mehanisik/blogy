# Blogy

A modern personal blog and portfolio platform built with Next.js 15, TypeScript, and Supabase.

![Blogy Landing Page](https://raw.githubusercontent.com/mehanisik/blogy/main/landing.png)

[View Live Site](https://mehanisik.com) · [Introduction](#introduction) · [Tech Stack](#tech-stack) · [Features](#features) · [Getting Started](#getting-started)

---

## Introduction

Blogy is a full-stack personal website and blog platform featuring a clean, minimalist design with a powerful admin interface for content management. Built with modern web technologies, it provides a seamless experience for both visitors and content creators.


## Tech Stack.

| Technology      | Version  |
|-----------------|----------|
| Next.js         | 15.3.3   |
| React           | 19.1.1   |
| TypeScript      | 5.9.2    |
| Tailwind CSS    | 4.1.11   |
| PostCSS         | 8.5.6    |
| Supabase        | 2.34.3   |
| Biome           | 2.0.0    |
| Knip            | 5.62.0   |
| React Hook Form | 7.62.0   |
| Zod             | 4.0.17   |
| React Markdown  | 10.1.0   |
| Recharts        | 3.1.2    |
| PostHog         | 1.259.0  |
| Vercel CLI      | 44.7.3   |


### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogy
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Configure your Supabase credentials and API keys
   ```

4. **Start development**
   ```bash
   yarn dev
   ```

### Development Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with Turbopack |
| `yarn build` | Build for production |
| `yarn format` | Format code with Biome |
| `yarn lint` | Lint code with Biome |
| `yarn typecheck` | Run TypeScript checks |
| `yarn clean` | Clean build artifacts and dependencies |
| `yarn knip` | Detect unused code and dependencies |

### Database Commands

| Command | Description |
|---------|-------------|
| `yarn db:types` | Generate TypeScript types from Supabase |
| `yarn db:push` | Push database migrations |
| `yarn db:migrate` | Create new migration |
| `yarn db:link` | Link to Supabase project |

## Project Structure

```
blogy/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin interface and dashboard
│   ├── api/               # API routes
│   │   ├── github/        # GitHub API integration
│   │   └── wakatime/      # WakaTime API integration
│   ├── posts/             # Blog posts
│   ├── projects/          # Portfolio projects
│   ├── publications/      # Academic publications
│   ├── tracker/           # Activity tracking
│   ├── legal/             # Privacy and terms pages
│   ├── auth/              # Authentication pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap generation
│   └── robots.ts          # SEO robots configuration
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   ├── ui/                # Shadcn UI components
│   ├── home/              # Homepage components
│   ├── layout/            # Layout components
│   └── common/            # Shared components
├── types/                 # TypeScript definitions
├── utils/                 # Utility functions
├── styles/                # Global CSS and Tailwind
└── supabase/              # Database configuration
```



### Environment Variables
Ensure you have the following environment variables configured:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `GITHUB_TOKEN` - GitHub personal access token
- `WAKATIME_API_KEY` - WakaTime API key
- `POSTHOG_KEY` - PostHog analytics key

## Contributing

This is a personal project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting (`yarn lint && yarn typecheck`)
5. Submit a pull request





