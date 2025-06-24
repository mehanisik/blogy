"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ModeToggle = () => {
	const { setTheme, theme } = useTheme();

	const handleThemeChange = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	if (!theme) return null;

	const Icon = theme === "light" ? MoonIcon : SunIcon;

	return (
		<Button
			variant="ghost"
			size="icon"
			className="shrink-0 text-foreground"
			onClick={handleThemeChange}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			<Icon className="h-[1.2rem] w-[1.2rem] transition-all" />
		</Button>
	);
};
