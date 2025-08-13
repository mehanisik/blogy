export function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
}

export function timeAgo(dateString: string) {
	const date = new Date(dateString);
	const now = new Date();
	const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
	if (diff < 60) return `${diff}s ago`;
	if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
	return `${Math.floor(diff / 86400)}d ago`;
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
