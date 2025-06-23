"use client";

import { MoonIcon, PaintBucketIcon, PaletteIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const themes = ["light", "dark", "yellow", "purple"];

const themeIcons = {
	light: SunIcon,
	dark: MoonIcon,
	yellow: PaletteIcon,
	purple: PaintBucketIcon,
} as const;

export const ModeToggle = () => {
	const { setTheme, theme } = useTheme();

	const handleThemeChange = () => {
		const currentIndex = themes.indexOf(theme || "light");
		const nextIndex = (currentIndex + 1) % themes.length;
		setTheme(themes[nextIndex]);
	};

	if (!theme) return null;

	const Icon = themeIcons[theme as keyof typeof themeIcons] || SunIcon;

	return (
		<Button
			variant="ghost"
			size="icon"
			className="shrink-0 text-foreground"
			onClick={handleThemeChange}
			aria-label="Toggle theme"
		>
			<Icon className="h-[1.2rem] w-[1.2rem] transition-all" />
		</Button>
	);
};
