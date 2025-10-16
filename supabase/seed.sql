-- Seed data for blogy project

-- Note: This seed file focuses on content for the core tables

-- Insert sample projects
INSERT INTO public.projects (title, description, slug, status, technologies)
VALUES 
(
    'Personal Portfolio Website',
    'A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features dark mode, blog functionality, and project showcase.',
    'personal-portfolio-website',
    'published',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'React']
),
(
    'E-commerce Platform',
    'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
    'ecommerce-platform',
    'published',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis']
),
(
    'Task Management App',
    'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
    'task-management-app',
    'published',
    ARRAY['Vue.js', 'Firebase', 'Vuetify', 'PWA']
),
(
    'Weather Dashboard',
    'A weather dashboard with real-time data, location-based forecasts, and interactive charts.',
    'weather-dashboard',
    'published',
    ARRAY['React', 'D3.js', 'OpenWeather API', 'Chart.js']
),
(
    'Blog CMS',
    'A content management system for blogs with markdown support, SEO optimization, and analytics.',
    'blog-cms',
    'published',
    ARRAY['Next.js', 'Prisma', 'PostgreSQL', 'Markdown', 'SEO']
);

-- Insert sample posts
INSERT INTO public.blogs (title, slug, subtitle, content, published, date, tags, read_time, view_count)
VALUES 
(
    'Building a Modern Portfolio with Next.js 15',
    'building-modern-portfolio-nextjs-15',
    'Learn how to create a stunning portfolio website using Next.js 15, TypeScript, and modern web technologies.',
    '# Building a Modern Portfolio with Next.js 15\n\n## Introduction\n\nCreating a personal portfolio is essential for showcasing your work and skills. In this post, I''ll walk you through building a modern portfolio using Next.js 15 and TypeScript.\n\n## Key Features\n\n- **Server Components**: Leverage React Server Components for better performance\n- **TypeScript**: Full type safety throughout the application\n- **Tailwind CSS**: Rapid UI development with utility classes\n- **Supabase**: Backend as a service for data management\n\n## Getting Started\n\nFirst, create a new Next.js project:\n\n```bash\nnpx create-next-app@latest my-portfolio --typescript --tailwind --app\n```\n\n## Project Structure\n\n```\nmy-portfolio/\n├── app/\n│   ├── layout.tsx\n│   ├── page.tsx\n│   └── globals.css\n├── components/\n│   └── ui/\n├── lib/\n└── types/\n```\n\n## Conclusion\n\nNext.js 15 provides excellent developer experience and performance for building modern web applications.',
    true,
    '2024-06-01T10:00:00Z',
    ARRAY['Next.js', 'React', 'TypeScript', 'Portfolio'],
    8,
    150
),
(
    'Understanding React Server Components',
    'understanding-react-server-components',
    'Deep dive into React Server Components and how they improve performance and user experience.',
    '# Understanding React Server Components\n\n## What are Server Components?\n\nServer Components are a new paradigm in React that allows components to run on the server and be rendered to HTML before being sent to the client.\n\n## Benefits\n\n1. **Reduced Bundle Size**: Server components don''t need to be included in the client bundle\n2. **Better Performance**: Faster initial page loads\n3. **Direct Database Access**: Server components can directly access databases\n4. **Better SEO**: Server-rendered content is better for search engines\n\n## Implementation\n\n```tsx\n// Server Component\nasync function UserProfile({ userId }: { userId: string }) {\n  const user = await getUser(userId);\n  \n  return (\n    <div>\n      <h1>{user.name}</h1>\n      <p>{user.bio}</p>\n    </div>\n  );\n}\n```\n\n## Best Practices\n\n- Use Server Components for data fetching\n- Keep interactive elements in Client Components\n- Leverage streaming for better UX',
    true,
    '2024-05-15T14:30:00Z',
    ARRAY['React', 'Server Components', 'Performance'],
    12,
    300
);

-- Insert sample publications
INSERT INTO public.publications (title, authors, description, doi, date)
VALUES 
(
    'Performance Analysis of Modern Web Frameworks',
    '{"Mehmet ISIK", "Dr. John Smith"}',
    'This paper presents a comprehensive analysis of performance characteristics across modern web frameworks including React, Vue, and Angular.',
    '10.1000/xyz123',
    '2024-03-15'
),
(
    'Building Scalable Microservices Architecture',
    '{"Mehmet ISIK"}',
    'A practical guide to designing and implementing scalable microservices architecture using modern technologies.',
    '10.1000/abc456',
    '2024-01-20'
);