export const hero = {
  name: "Mehmet Isik",
  tagline: "Software Engineer — Full-Stack Development",
  role: "Software Engineer — Full-Stack Development",
  location: "Warsaw, Poland",
  contact: {
    phone: "+48 780 612 852",
    email: "mehanisik@outlook.com",
    linkedin: "https://www.linkedin.com/in/mehanisik",
    github: "https://github.com/mehanisik",
  },
  summary:
    "Recent Master’s graduate with 2+ years of experience in full-stack development and front-end technologies. Passionate about building scalable, user-focused applications with clean, maintainable code.",
};

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS"],
  frameworks: [
    "React.js",
    "Next.js",
    "Tailwind",
    "Material UI",
    "WebSocket",
    "Flask",
    "Node.js",
  ],
  tools: [
    "Arch Linux",
    "Docker",
    "Git",
    "Grafana",
    "Jira",
    "Postman",
    "Prometheus",
    "Storybook",
    "Jest",
    "CI/CD",
  ],
};

export const socialLinks = [
  {
    label: "LinkedIn",
    href: hero.contact.linkedin,
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: hero.contact.github,
    icon: "github",
  },
  {
    label: "Email",
    href: `mailto:${hero.contact.email}`,
    icon: "email",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export const writings: {
  title: string;
  year: string;
  icon: string;
  link: string;
}[] = [];
