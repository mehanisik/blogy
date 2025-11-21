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

export const education = [
  {
    school: "Warsaw University of Technology",
    location: "Warsaw, Poland",
    degree: "Master’s in Computer Systems and Networks",
    date: "Feb 2025",
  },
  {
    school: "Hasan Kalyoncu University",
    location: "Gaziantep, Turkey",
    degree: "Bachelor’s in Software Engineering",
    date: "June 2021",
  },
];

export const experience = [
  {
    role: "Junior Frontend Developer",
    company: "SkySnap",
    location: "Warsaw, Poland",
    period: "June 2022 – Dec 2023",
    achievements: [
      "Engineered a GIS-powered construction portal using Next.js, Redux Toolkit, and OpenLayers, enabling real-time geospatial data visualization for on-site decision-making.",
      "Crafted live collaboration features with WebSockets (Socket.io), allowing teams to update geospatial data and streamline project coordination instantly.",
      "Improved code reliability with TypeScript and efficient state management using Redux, refactored existing modules to follow SOLID principles.",
      "Authored comprehensive documentation using Storybook and GitLab for over 50 project components, improving knowledge transfer and ensuring alignment with best practices through SonarQube analysis.",
      "Utilized Docker for containerization and GitLab for CI/CD, streamlining development workflows and reducing deployment issues.",
    ],
  },
  {
    role: "Full Stack Engineer Intern",
    company: "Team Knocknock",
    location: "Warsaw, Poland",
    period: "June 2022 – Nov 2022",
    achievements: [
      "Developed frontend components using React, translating Figma mockups into interfaces for an apartment management system project.",
      "Integrated REST endpoints to enhance data flow between front-end and back-end services, ensuring high website performance under daily user traffic.",
      "Participated in weekly team meetings, presented feature progress, and contributed to project planning in a startup environment.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "RobotBulls",
    location: "Remote",
    period: "May 2021 – June 2021",
    achievements: [
      "Developed Python scripts to collect, clean, and structure crypto market data for machine learning model training.",
      "Utilized and implemented libraries including Pandas, NumPy, and scikit-learn.",
      "Researched and tested machine learning (ML) models for AI-based trading signals.",
    ],
  },
];

export const projects = [
  {
    title: "Crypto-Predict: Thesis Project",
    description:
      "Developed an interactive web application for forecasting and visualizing cryptocurrency prices using deep learning models such as CNN, LSTM, and hybrid models.",
    link: "",
  },
  {
    title: "Job-Tracker",
    description:
      "Built a full-stack web platform for people to track their job searching progress using React.js and Supabase.",
    link: "",
  },
];

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
