import { SOCIAL_LINKS } from "@/constants/social-links.constant";

export function SocialLinks() {
	return (
		<section className="mt-10 flex justify-between items-center text-zinc-600 dark:text-white">
			<div className="flex flex-wrap gap-x-4 gap-y-2 text-base">
				{SOCIAL_LINKS.map((link) => (
					<a
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-900"
						aria-label={link.label}
					>
						[ {link.label} ]
					</a>
				))}
			</div>
			<div className="text-sm font-mono">
				{new Date().getFullYear()} • Poland
			</div>
		</section>
	);
}
