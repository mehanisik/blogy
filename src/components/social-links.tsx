import { SOCIAL_LINKS } from "@/constants/social-links.constant";

export function SocialLinks() {
	return (
		<section className="mt-8 mb-4 flex justify-between items-center">
			<div className="flex flex-wrap gap-x-4 gap-y-2 text-base">
				{SOCIAL_LINKS.map((link) => (
					<a
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-900"
					>
						[ {link.label} ]
					</a>
				))}
			</div>
			<div className="text-gray-500 text-sm font-mono">← 🦁 →</div>
		</section>
	);
}
