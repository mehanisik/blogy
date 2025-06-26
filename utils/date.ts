export function getWeekdayAbbr(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });
}

export function getCurrentYear() {
	return new Date().getFullYear();
}

export const formatDate = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	const dayStr = day < 10 ? `0${day}` : `${day}`;
	const monthStr = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;

	return `${year}-${monthStr}-${dayStr}`;
};
