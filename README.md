

# Personal Website

A personal blog and portfolio website that i  built with Next.js 15, TypeScript, and Supabase.I use this website to share my daily work and projects with along the posting the my studied notes.

- **Next.js 15** 
- **TypeScript** 
- **Tailwind CSS** 
- **Shadcn/ui** 
- **Supabase** 
- **PostgreSQL** 
- **React Markdown** 
- **Remark GFM** 
- **Rehype Highlight** 
- **Biome** 


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mehanisik/blogy.git
   cd blogy
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   

4. **Environment Variables**
   Create a `.env.local` file that similar to example env that i created in .env.example:
   ```env
   NEXT_PUBLIC_BASE=http://localhost:3000/
   NEXT_PUBLIC_PORT=3000
   NEXT_PUBLIC_NODE_ENV=development
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_PROJECT_ID=
   WAKATIME_API_KEY=
   ```

5. **Run the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Tracker Setup

The tracker page displays your coding activity from WakaTime and GitHub contributions. To enable this feature:

#### WakaTime Setup
1. Go to [WakaTime](https://wakatime.com) and create an account
2. Install the WakaTime extension for your editor
3. Get your API key from [WakaTime API Settings](https://wakatime.com/settings/api)
4. Add `WAKATIME_API_KEY=your_api_key` to your `.env.local`



The tracker will display:
- **Coding Activity**: Total time, best day, top languages, projects, and editors

<p align="center">
  <img src="/public/assets/og.png" alt="Personal Website Open Graph Image" width="100%" />
</p>