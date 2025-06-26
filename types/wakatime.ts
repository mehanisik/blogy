export interface WakaTimeAllTimeData {
	daily_average: number;
	decimal: string;
	digital: string;
	is_up_to_date: boolean;
	percent_calculated: number;
	range: {
		end: string;
		end_date: string;
		end_text: string;
		start: string;
		start_date: string;
		start_text: string;
		timezone: string;
	};
	text: string;
	timeout: number;
	total_seconds: number;
}

export interface WakaTimeLanguageData {
	name: string;
	percent: number;
	total_seconds: number;
}

export interface WakaTimeLastSevenDaysData {
	days: {
		date: string;
		hours: number;
	}[];
	daily_average: number;
	total_seconds: number;
}
