import { SOCIAL_LINKS } from "@/constants/social-links.constant";

export function SocialLinks() {
	return (
		<div className="flex flex-row flex-wrap gap-x-3 gap-y-2 text-sm justify-end items-center">
			{SOCIAL_LINKS.map((link) => (
				<a
					key={link.label}
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center px-2 py-1 rounded-sm transition-[background-color] whitespace-nowrap font-medium"
					aria-label={link.label}
				>
					{link.label}
				</a>
			))}
		</div>
	);
}
