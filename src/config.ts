export const SITE_TITLE = "MEHANISIK – Software Developer";
export const SITE_DESCRIPTION =
  "Mehmet isik is a software developer who is passionate about building software that is easy to use and efficient.";

export const siteConfig = {
  url: "https://mehanisik.is-a.dev/",
  name: "MEHANISIK",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/mehanisik",
    x: "https://x.com/siralcntra",
    linkedin: "https://www.linkedin.com/in/mehanisik",
  },
};

export type SiteConfig = typeof siteConfig;
