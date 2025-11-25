import { defineCollection, z } from "astro:content";

const experience = defineCollection({
  type: "content",
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    period: z.string(),
    // We'll use the body for achievements, but we can also keep them in frontmatter if preferred.
    // Given the current structure, let's keep it simple and put achievements in the body as a list.
  }),
});

const projects = defineCollection({
  type: "data", // Using data type for JSON
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().optional(),
    demo: z.string().optional(),
    github: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    date: z.string().optional(), // Using string for date to be flexible
  }),
});

const education = defineCollection({
  type: "data",
  schema: z.object({
    school: z.string(),
    location: z.string(),
    degree: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  experience,
  projects,
  education,
};
