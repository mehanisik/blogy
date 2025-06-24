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
   - Create the database tables (see Database Schema below)

4. **Environment Variables**
   Create a `.env.local` file that similar to .env.example:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Tracker Configuration (Optional)
   WAKATIME_API_KEY=your_wakatime_api_key
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_USERNAME=your_github_username
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

#### GitHub Setup
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with the following scopes:
   - `public_repo` (for public repository access)
   - `read:user` (for user profile data)
3. Add the following to your `.env.local`:
   ```env
   GITHUB_TOKEN=your_personal_access_token
   GITHUB_USERNAME=your_github_username
   ```

The tracker will display:
- **Coding Activity**: Total time, best day, top languages, projects, and editors
- **GitHub Activity**: Repository stats, recent repos, and recent activity
