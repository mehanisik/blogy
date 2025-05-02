import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const isDarkMode =
			localStorage.getItem("theme") === "dark" ||
			(!localStorage.getItem("theme") &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);

		setDarkMode(isDarkMode);
		applyTheme(isDarkMode);
	}, []);

	const toggleTheme = () => {
		const newMode = !darkMode;
		setDarkMode(newMode);
		applyTheme(newMode);
		localStorage.setItem("theme", newMode ? "dark" : "light");
	};

	const applyTheme = (isDark: boolean) => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};
	return (
		<button type="button" onClick={toggleTheme} className="cursor-pointer">
			{darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
		</button>
	);
}
