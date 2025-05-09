import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const isDarkMode =
			localStorage.getItem("theme") === "dark" ||
			(!localStorage.getItem("theme") &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);

		setDarkMode(isDarkMode);
		setMounted(true);
	}, []);

	useEffect(() => {
		if (darkMode === undefined) return;

		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const toggleTheme = () => {
		const newMode = !darkMode;
		setDarkMode(newMode);
		localStorage.setItem("theme", newMode ? "dark" : "light");
	};

	if (!mounted) {
		return (
			<button
				type="button"
				className="p-2 rounded-full"
				aria-label="Loading theme"
				disabled
			>
				<div className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-300"
			aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
		>
			{darkMode ? (
				<Sun className="h-5 w-5 transition-transform duration-200 hover:rotate-12" />
			) : (
				<Moon className="h-5 w-5 transition-transform duration-200 hover:rotate-12" />
			)}
		</button>
	);
}
