-- Seed data for blogy project

-- Note: This seed file focuses on content for the core tables
-- Removed: profiles, views, skills, experience tables

-- Insert sample projects
INSERT INTO public.projects (title, description, slug, featured, status, technologies)
VALUES 
(
    'Personal Portfolio Website',
    'A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features dark mode, blog functionality, and project showcase.',
    'personal-portfolio-website',
    true,
    'published',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'React']
),
(
    'E-commerce Platform',
    'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
    'ecommerce-platform',
    true,
    'published',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis']
),
(
    'Task Management App',
    'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
    'task-management-app',
    false,
    'published',
    ARRAY['Vue.js', 'Firebase', 'Vuetify', 'PWA']
),
(
    'Weather Dashboard',
    'A weather dashboard with real-time data, location-based forecasts, and interactive charts.',
    'weather-dashboard',
    false,
    'published',
    ARRAY['React', 'D3.js', 'OpenWeather API', 'Chart.js']
),
(
    'Blog CMS',
    'A content management system for blogs with markdown support, SEO optimization, and analytics.',
    'blog-cms',
    false,
    'published',
    ARRAY['Next.js', 'Prisma', 'PostgreSQL', 'Markdown', 'SEO']
);

-- Insert sample posts
INSERT INTO public.posts (title, slug, excerpt, content, featured, published, published_at, tags, reading_time)
VALUES 
(
    'Building a Modern Portfolio with Next.js 15',
    'building-modern-portfolio-nextjs-15',
    'Learn how to create a stunning portfolio website using Next.js 15, TypeScript, and modern web technologies.',
    '# Building a Modern Portfolio with Next.js 15

## Introduction

Creating a personal portfolio is essential for showcasing your work and skills. In this post, I''ll walk you through building a modern portfolio using Next.js 15 and TypeScript.

## Key Features

- **Server Components**: Leverage React Server Components for better performance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Rapid UI development with utility classes
- **Supabase**: Backend as a service for data management

## Getting Started

First, create a new Next.js project:

```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app
```

## Project Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
├── lib/
└── types/
```

## Conclusion

Next.js 15 provides excellent developer experience and performance for building modern web applications.',
    true,
    true,
    '2024-06-01T10:00:00Z',
    ARRAY['Next.js', 'React', 'TypeScript', 'Portfolio'],
    8
),
(
    'Understanding React Server Components',
    'understanding-react-server-components',
    'Deep dive into React Server Components and how they improve performance and user experience.',
    '# Understanding React Server Components

## What are Server Components?

Server Components are a new paradigm in React that allows components to run on the server and be rendered to HTML before being sent to the client.

## Benefits

1. **Reduced Bundle Size**: Server components don''t need to be included in the client bundle
2. **Better Performance**: Faster initial page loads
3. **Direct Database Access**: Server components can directly access databases
4. **Better SEO**: Server-rendered content is better for search engines

## Implementation

```tsx
// Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
```

## Best Practices

- Use Server Components for data fetching
- Keep interactive elements in Client Components
- Leverage streaming for better UX',
    false,
    true,
    '2024-05-15T14:30:00Z',
    ARRAY['React', 'Server Components', 'Performance'],
    12
);

-- Insert sample publications
INSERT INTO public.publications (title, authors, abstract, publication_type, journal, doi, published_date, featured)
VALUES 
(
    'Performance Analysis of Modern Web Frameworks',
    ARRAY['Mehmet ISIK', 'Dr. John Smith'],
    'This paper presents a comprehensive analysis of performance characteristics across modern web frameworks including React, Vue, and Angular.',
    'paper',
    'International Journal of Web Engineering',
    '10.1000/xyz123',
    '2024-03-15',
    true
),
(
    'Building Scalable Microservices Architecture',
    ARRAY['Mehmet ISIK'],
    'A practical guide to designing and implementing scalable microservices architecture using modern technologies.',
    'article',
    'Software Engineering Today',
    '10.1000/abc456',
    '2024-01-20',
    false
);

-- Insert sample education
INSERT INTO public.education (degree, institution, location, description, start_date, end_date, current, gpa)
VALUES 
(
    'Master of Science in Computer Systems and Networks',
    'Warsaw University of Technology',
    'Warsaw, Poland',
    'Specialized in distributed systems, network security, and advanced algorithms. Thesis on "Performance Optimization in Microservices Architecture".',
    '2022-09-01',
    '2024-06-30',
    false,
    4.2
),
(
    'Bachelor of Science in Computer Science',
    'Warsaw University of Technology',
    'Warsaw, Poland',
    'Fundamental computer science education with focus on programming, algorithms, and software engineering.',
    '2019-09-01',
    '2022-06-30',
    false,
    3.9
); 