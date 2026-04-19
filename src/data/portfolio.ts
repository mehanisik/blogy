import type { ImageMetadata } from "astro";
import atikexp from "../assets/projects/atikexp.webp";
import blogy from "../assets/projects/blogy.webp";
import cryptoPredict from "../assets/projects/crypto-predict.webp";
import wooah from "../assets/projects/wooah.webp";

export const hero = {
  name: "Mehmet Isik",
  tagline: "Software Engineer, Full-Stack and DevOps",
  role: "software engineer",
  location: "Warsaw, Poland",
  contact: {
    email: "mehanisik@outlook.com",
    linkedin: "https://www.linkedin.com/in/mehanisik",
    github: "https://github.com/mehanisik",
  },
  summary:
    "i am mehmet. i am a {{role}} who builds, ships, and runs software across the web and the cloud.",
  highlight: "stack",
};

export const navLinks = [
  { label: "work", href: "#work" },
  { label: "notes", href: "#writing" },
];

export interface ProjectFallback {
  id: number;
  title: string;
  description: string;
  link?: string;
  demo?: string;
  github?: string;
  technologies?: string[];
  date?: string;
  image?: ImageMetadata;
}

export const projectsFallback: ProjectFallback[] = [
  {
    id: 1,
    title: "crypto-predict",
    description:
      "deep learning pipeline for crypto price forecasting with cnn, lstm, and hybrid models. my thesis, still alive as a playground.",
    github: "https://github.com/mehanisik/crypto-predict",
    demo: "https://crypto-prediction-mhanifiisiks-projects.vercel.app",
    technologies: ["python", "pytorch", "next.js"],
    date: "2025-01-01",
    image: cryptoPredict,
  },
  {
    id: 2,
    title: "wooah",
    description:
      "hypertrophy tracker with progressive overload, volume targets, and mesocycle planning.",
    github: "https://github.com/mehanisik/wooah",
    demo: "https://wooah.vercel.app",
    technologies: ["typescript", "next.js"],
    date: "2026-01-01",
    image: wooah,
  },
  {
    id: 3,
    title: "atik express",
    description:
      "production site for a logistics firm running on a custom domain. client work shipped end to end.",
    github: "https://github.com/mehanisik/logistic-firm",
    demo: "https://www.atikexp.com",
    technologies: ["typescript", "next.js"],
    date: "2025-11-01",
    image: atikexp,
  },
  {
    id: 4,
    title: "blogy",
    description:
      "this site. astro, ink background, grain overlay, almost no client js.",
    github: "https://github.com/mehanisik/blogy",
    demo: "https://mehanisik.is-a.dev",
    technologies: ["astro", "typescript"],
    date: "2026-01-01",
    image: blogy,
  },
];
