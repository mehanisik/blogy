export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  period: string;
  role: string;
  organization: string;
  location?: string;
  summary: string;
  stack: string[];
  meta?: string;
};

export type ProjectItem = {
  title: string;
  tagline: string;
  description: string;
  metrics?: string;
  stack: string[];
  link: string;
  imageLabel: string;
};

export type WritingItem = {
  title: string;
  year: string;
  link: string;
  icon: string;
};

export const hero = {
  name: "Brittany Chiang",
  role: "Front End Engineer",
  tagline: "I build accessible, pixel-perfect digital experiences for the web.",
  intro:
    "I’m a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering.",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/bchiang7" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bchiang7" },
  { label: "CodePen", href: "https://codepen.io/bchiang7" },
  { label: "Instagram", href: "https://www.instagram.com/bchiang7" },
  {
    label: "Goodreads",
    href: "https://www.goodreads.com/user/show/1832220-brittany-chiang",
  },
];

export const aboutParagraphs: string[] = [
  "I’m a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.",
  "Currently, I'm a Senior Front-End Engineer at Klaviyo, specializing in accessibility. I contribute to the creation and maintenance of UI components that power Klaviyo’s frontend, ensuring our platform meets web accessibility standards and best practices to deliver an inclusive user experience.",
  "In the past, I've had the opportunity to develop software across a variety of settings — from advertising agencies and large corporations to start-ups and small digital product studios. Additionally, I also released a comprehensive video course a few years ago, guiding learners through building a web app with the Spotify API.",
  "In my spare time, I’m usually climbing, playing tennis, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds.",
];

export const experience: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Senior Frontend Engineer, Accessibility",
    organization: "Klaviyo",
    summary:
      "Build and maintain critical components used to construct Klaviyo’s frontend. Partner cross-functionally to implement and advocate for best practices in web accessibility.",
    stack: ["JavaScript", "TypeScript", "React", "Storybook"],
  },
  {
    period: "2018 — 2024",
    role: "Lead Engineer · Upstatement",
    organization: "Upstatement",
    summary:
      "Build, style, and ship high-quality websites, design systems, and digital experiences for clients including Harvard Business School, Everytown, Pratt Institute, Vanderbilt University, and more.",
    stack: [
      "JavaScript",
      "TypeScript",
      "HTML & SCSS",
      "React",
      "Next.js",
      "React Native",
      "WordPress",
      "Contentful",
      "Node.js",
      "PHP",
    ],
    meta: "Senior Engineer · Engineer",
  },
  {
    period: "July — Dec 2017",
    role: "UI Engineer Co-op",
    organization: "Apple",
    summary:
      "Developed and styled interactive web apps for Apple Music, including the embeddable web player widget supporting in-browser auth and full song playback.",
    stack: ["MusicKit.js", "Ember", "SCSS", "JavaScript"],
    meta: "Featured on 9to5Mac & The Verge",
  },
  {
    period: "2016 — 2017",
    role: "Developer",
    organization: "Scout Studio",
    summary:
      "Collaborated with student designers and engineers on pro-bono branding, design systems, and websites for organizations in the community.",
    stack: ["Jekyll", "SCSS", "JavaScript", "WordPress"],
  },
  {
    period: "July — Dec 2016",
    role: "Software Engineer Co-op",
    organization: "Starry",
    summary:
      "Worked with the UI team to engineer and improve major features of Starry’s customer-facing Android app.",
    stack: [
      "Android",
      "ScreenTime 2.0",
      "Cordova",
      "Backbone",
      "JavaScript",
      "CSS",
    ],
  },
  {
    period: "July — Dec 2015",
    role: "Creative Technologist Co-op",
    organization: "MullenLowe U.S.",
    summary:
      "Developed, maintained, and shipped production code for JetBlue, Lovesac, U.S. Cellular, the Department of Defense, and more.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery"],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Build a Spotify Connected App",
    tagline: "Course",
    description:
      "Video course that teaches how to build a web app with the Spotify Web API covering REST, auth flows, Node, Express, React, and Styled Components.",
    metrics: "Newline course • marketing card",
    stack: ["React", "Styled Components", "Node", "Express", "Spotify API"],
    link: "https://www.newline.co/courses/build-a-spotify-connected-app",
    imageLabel: "Course promo art",
  },
  {
    title: "Spotify Profile",
    tagline: "Product",
    description:
      "Web app for visualizing personalized Spotify data — top artists, tracks, recent plays, and playlist-based recommendations.",
    metrics: "699 stars",
    stack: ["React", "Express", "Spotify API", "Heroku"],
    link: "https://spotify-profile-chiang.netlify.app",
    imageLabel: "Spotify profile dashboard",
  },
  {
    title: "Halcyon Theme",
    tagline: "Product",
    description:
      "Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more with over 100k installs.",
    metrics: "100k+ installs",
    stack: ["VS Code", "Sublime", "Atom", "iTerm"],
    link: "https://halcyon-theme.netlify.app",
    imageLabel: "Halcyon editor theme",
  },
  {
    title: "brittanychiang.com (v4)",
    tagline: "Portfolio",
    description: "Gatsby-powered portfolio with over 6k stars and 3k forks.",
    metrics: "8,111 stars",
    stack: ["Gatsby", "Styled Components", "Netlify"],
    link: "https://github.com/bchiang7/v4",
    imageLabel: "Portfolio hero section",
  },
];

export const writings: WritingItem[] = [
  {
    title: "5 Common Accessibility Pitfalls and How to Avoid Them",
    year: "2024",
    link: "https://telescope.com/accessibility-pitfalls",
    icon: "Accessibility",
  },
  {
    title: "Integrating Algolia Search with WordPress Multisite",
    year: "2020",
    link: "https://www.telescope.com/algolia-wordpress",
    icon: "Telescope",
  },
  {
    title: "Building a Headless Mobile App CMS From Scratch",
    year: "2019",
    link: "https://www.headlesshorseman.dev/cms-from-scratch",
    icon: "Headless horseman",
  },
];

export const footerNote =
  "Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with Astro and Tailwind CSS, deployed with Vercel. All text is set in the Inter typeface.";
