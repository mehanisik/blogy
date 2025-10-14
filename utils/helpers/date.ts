export function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
}

export function formatMonthYearShort(dateString: string | null): string | null {
	if (!dateString) return null;
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
	});
}

export function formatMonthYearLong(dateString: string | null): string | null {
	if (!dateString) return null;
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
	});
}

export function calculateDurationDaysString(
	startDateString: string | null,
	endDateString?: string | null,
): string | null {
	if (!startDateString) return null;
	const startDate = new Date(startDateString);
	const endDate = endDateString ? new Date(endDateString) : new Date();
	const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	if (diffDays < 30) return `${diffDays} days`;
	if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
	return `${Math.floor(diffDays / 365)} years`;
}

export function timeAgo(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	let interval = seconds / 31536000;
	if (interval > 1) {
		return Math.floor(interval) + " years ago";
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + " months ago";
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + " days ago";
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + " hours ago";
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes ago";
	}
	return Math.floor(seconds) + " seconds ago";
}
