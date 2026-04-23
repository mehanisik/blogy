# Changelog

## [2.1.0](https://github.com/mehanisik/blogy/compare/v2.0.0...v2.1.0) (2026-04-23)


### Features

* **content:** add velero and sonarqube community plugin posts ([805706c](https://github.com/mehanisik/blogy/commit/805706cc5747da5707d1171fcb6aa37e27e00d88))
* **markdown:** open external links in a new tab via rehype-external-links ([a73f209](https://github.com/mehanisik/blogy/commit/a73f2097e16ee553001c69f7a4d23c8ca618391f))

## 2.0.0 (2026-04-19)


### ⚠ BREAKING CHANGES

* removes Supabase backend, admin UI, and React.
    - content collections now load from local markdown files
    - hero and projects data live in src/data/portfolio.ts
    - bumped to Astro 6, TypeScript 6, Vercel adapter 10
    - replaced GSAP and Lenis with native CSS + IntersectionObserver
    - removed 19 dependencies (react, tailwind, three, supabase, gsap, lenis)

### Features

* add DoiLink component for improved DOI link handling in publications list and update styles for border color consistency ([9dbbdc9](https://github.com/mehanisik/blogy/commit/9dbbdc90052bae9e7e2435c385768148c3ad0fae))
* Add environment configuration file, update Supabase client initialization, and integrate Umami tracking script in the root component ([4780d42](https://github.com/mehanisik/blogy/commit/4780d428b5b6cfed0080f2f41355f3f6efe7374e))
* add project image display with default fallback and fix Supabase anon key environment variable loading. ([4a76681](https://github.com/mehanisik/blogy/commit/4a76681b963c15fc3be83cb4007e5aa3f4e98d16))
* Add sign-in and admin routes, implement markdown editor, and enhance layout structure ([fbbc06a](https://github.com/mehanisik/blogy/commit/fbbc06ad9ce08ee0aea11a2b4adcdb546f83a5f2))
* Add skip to content link, improve responsiveness, and refactor CSS color variables by removing custom utility classes. ([53393ac](https://github.com/mehanisik/blogy/commit/53393ac20ae6ff3a431eb6f5f4e7f2beb27e6dfe))
* Add theme toggle component and enhance error handling with default catch boundary ([8d61bcf](https://github.com/mehanisik/blogy/commit/8d61bcfdde5174c2d172e680a43d183382fec637))
* Api instance services created ([8a8b2ad](https://github.com/mehanisik/blogy/commit/8a8b2ad5f71cdcc163cd07eb84efda194d68c837))
* Configure for github pages deployment ([c9610ed](https://github.com/mehanisik/blogy/commit/c9610ed026f6bc6d736130effe2fee5ba0c51f41))
* configure vercel deployment, refactor editor, and cleanup ([3fafdf6](https://github.com/mehanisik/blogy/commit/3fafdf6036e1ba7c025cd0a28e6ef167fbbd45f5))
* Enhance sign-in function with input validation and improved error handling ([73d18a3](https://github.com/mehanisik/blogy/commit/73d18a3f0cd0f41320a525691c3e3cafc8acf4c3))
* implement GitHub README fetching functionality and integrate into project detail component for enhanced project documentation ([d3942d0](https://github.com/mehanisik/blogy/commit/d3942d04e4345a5a947b5c6bb0f0866faf3c7917))
* Implement Vercel cron job for Supabase ping via new API endpoint, replacing GitHub Actions workflow and updating env example. ([4d2332e](https://github.com/mehanisik/blogy/commit/4d2332e65d9bca71854937279bd4ca770190355d))
* implement view count functionality for blog posts, including view incrementer component, SQL migration for view count, and updates to post queries ([0b15298](https://github.com/mehanisik/blogy/commit/0b152981d00eb17484b79abea644611d3636ccdd))
* Integrate Supabase for data management and implement a comprehensive UI redesign with new components and global styles. ([14a874a](https://github.com/mehanisik/blogy/commit/14a874abbdc6a651cfc59b2f5bdb9374bd8fed5b))
* Migrate deployment to Bun and update router basepath for GitHub Pages ([312bbf8](https://github.com/mehanisik/blogy/commit/312bbf8a3a8a872172c5bbc0a3898e663f86b2c6))
* Migrate to bun.lock and refactor data fetching methods for projects, publications, and blogs ([c8e8f92](https://github.com/mehanisik/blogy/commit/c8e8f9292cfc3877faeea5d0895582e22c469576))
* Projects and publications routes are created ([fcbb36e](https://github.com/mehanisik/blogy/commit/fcbb36ee6fa45a9248b2b38ea562d7721401b4f1))
* README and header component for improved clarity ([3c20faa](https://github.com/mehanisik/blogy/commit/3c20faa1b252e6807fc816c2006fb93f9e1f9d27))
* Redesign navigation, project section, and hero ([c6d41c3](https://github.com/mehanisik/blogy/commit/c6d41c36fc4236b93fc701c44b441f95f7a0fae4))
* Refactor code structure for improved readability and maintainability ([826c37e](https://github.com/mehanisik/blogy/commit/826c37e2cda020da0d3d122c0cc56eb2e8303bc6))
* Refactor components and improve accessibility ([5601c52](https://github.com/mehanisik/blogy/commit/5601c52ad47a39bc642ee750915760a561f9627f))
* Refactor layout components and enhance UI elements across the application ([39c0507](https://github.com/mehanisik/blogy/commit/39c050769200a47d8ea2de5d403fb503463c79f5))
* Refactor routing and service functions, enhance error handling, and implement new admin blog management features ([8ab9571](https://github.com/mehanisik/blogy/commit/8ab95717f813d0995dc90779b30e928238c106fd))
* Remove Sentry integration, update dependencies, and enhance project structure with new icons and SEO improvements ([c20664b](https://github.com/mehanisik/blogy/commit/c20664b3b06684cbd513e78e1ac9bef6f22caa3e))
* Revise README for clarity ([63c76fa](https://github.com/mehanisik/blogy/commit/63c76fae4a237d160bc8e23acb070b8d63ffc4e2))
* SEO improvements, cleanup, and CI setup ([c5b7a73](https://github.com/mehanisik/blogy/commit/c5b7a73b0a1039af7e471f56be1cf8d16b9668bc))
* update CI workflow to use Bun for dependency management ([81c40ff](https://github.com/mehanisik/blogy/commit/81c40ff3a9c9f2bcc9f6dc32b42af26a26abee8c))
* update environment configuration and project structure ([1049681](https://github.com/mehanisik/blogy/commit/10496813c0112d1b44e39894e44dcd54d19db77a))
* Update environment variable names for Supabase and Umami, add Vite configuration, and create Netlify build settings ([b7f1591](https://github.com/mehanisik/blogy/commit/b7f159185cbbad60dfe3163912e51fbec1636daf))
* Update project structure with new favicon, SEO enhancements, and markdown support ([f6e5e94](https://github.com/mehanisik/blogy/commit/f6e5e94a3ab9cd0ec57c5b266247aa35be8b4e1c))
* v2 portfolio redesign ([31d0610](https://github.com/mehanisik/blogy/commit/31d06102eef2cdff074d75f38126c692fce100c7))


### Bug Fixes

* Correct Supabase environment variable names in code and documentation. ([d936a79](https://github.com/mehanisik/blogy/commit/d936a79325e520726ab23fdb3ea11775750eb3d0))
* enhance error handling in GitHub and WakaTime API functions, ensuring null returns on fetch failures and improving data validation in components ([71eef5f](https://github.com/mehanisik/blogy/commit/71eef5f5e2383560350223639b89c7138fb44ed6))
* removed the time interval for testing the serverFn ([0287d7b](https://github.com/mehanisik/blogy/commit/0287d7bfd885cb5ebfe9ebe5b5aef370502a0133))
