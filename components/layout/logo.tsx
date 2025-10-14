interface LogoProps {
	className?: string;
	showText?: boolean;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, showText = true }: LogoProps) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 280 80"
			fill="none"
			aria-label="mehanisik logo"
		>
			<title>mehanisik</title>

			<path
				d="M12 42 C16 32, 22 32, 26 42 C30 52, 36 52, 40 42 C44 32, 50 32, 54 42"
				stroke="currentColor"
				strokeWidth="10"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>

			{showText && (
				<text
					x="80"
					y="50"
					fill="currentColor"
					fontFamily={"Inter, -apple-system, system-ui, sans-serif"}
					fontSize="32"
					fontWeight="600"
					letterSpacing="-0.5"
				>
					mehanisik
				</text>
			)}
		</svg>
	);
}
