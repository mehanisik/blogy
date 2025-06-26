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

export function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
}
