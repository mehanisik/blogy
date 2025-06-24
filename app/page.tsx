import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { getCurrentYear } from "@/utils/date";

export default function Home() {
	return (
		<PageLayout>
			<main className="flex flex-1 flex-col">
				<section className="py-8" aria-labelledby="hero-heading">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<h1
								id="hero-heading"
								className="text-3xl font-light tracking-tight text-foreground"
							>
								Mehmet ISIK
							</h1>
							<p className="text-xl font-light text-muted-foreground">
								Software Engineer & Full-Stack Developer
							</p>
						</div>
						<Image
							src="https://github.com/mehanisik.png"
							alt="Mehmet ISIK profile picture"
							width={85}
							height={85}
							className="rounded-full filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							priority
						/>
					</div>
				</section>

				<section aria-labelledby="about-heading">
					<div className="space-y-6">
						<h2
							id="about-heading"
							className="text-2xl font-light text-foreground"
						>
							About
						</h2>
						<div className="space-y-4 text-muted-foreground leading-relaxed">
							<p>
								I'm a recent master's graduate in Computer Systems and Networks
								from{" "}
								<Link
									href="https://eng.pw.edu.pl/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
									aria-label="Visit Warsaw University of Technology website (opens in new tab)"
								>
									WUT
								</Link>{" "}
								, I am interested in software development and building web
								applications, infrastructure and distributed systems.
							</p>
							<p>
								I love working within the React ecosystem and exploring new
								technologies, libraries, and tools. I'm always eager to learn
								and take on new challenges that push me to grow as a developer.
							</p>
							<p>
								When I'm not coding, you'll find me playing chess, reading
								books, or sitting in random place and enjoying the nature.
							</p>
						</div>
					</div>
				</section>

				<section className="py-10" aria-labelledby="recent-heading">
					<div className="space-y-6">
						<h2
							id="recent-heading"
							className="text-2xl font-light text-foreground"
						>
							Recently
						</h2>
						<ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-outside pl-4">
							{[
								"Graduated with a Master's in Computer Systems and Networks",
								"Improving Frontend skills in JavaScript and TypeScript",
								"Learning Distributed Systems and architecture patterns",
								"Building side projects to enhance coding skills",
								"Practicing LeetCode problems",
							].map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
				</section>
			</main>

			<footer className="border-t border-border py-6">
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-sm text-muted-foreground">
						&copy; {getCurrentYear()} mehanisik
					</p>
					<nav aria-label="Social media links">
						<div className="flex items-center gap-4">
							{[
								{
									href: "https://github.com/mehanisik",
									label: "GitHub",
									iconPath:
										"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
								},
								{
									href: "https://www.linkedin.com/in/mehanisik/",
									label: "LinkedIn",
									iconPath:
										"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
								},
								{
									href: "https://www.x.com/siralcntra",
									label: "X (Twitter)",
									iconPath:
										"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
								},
							].map(({ href, label, iconPath }) => (
								<Link
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit ${label} profile (opens in new tab)`}
									className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
								>
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d={iconPath} />
									</svg>
								</Link>
							))}
						</div>
					</nav>
				</div>
			</footer>
		</PageLayout>
	);
}
