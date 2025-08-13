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

export interface WakatimeSummariesResponse {
	data: Array<{
		grand_total: {
			digital: string;
			hours: number;
			minutes: number;
			text: string;
			total_seconds: number;
		};
		projects: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			digital: string;
			text: string;
			hours: number;
			minutes: number;
		}>;
		languages: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			digital: string;
			text: string;
			hours: number;
			minutes: number;
			seconds: number;
		}>;
		editors: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			digital: string;
			text: string;
			hours: number;
			minutes: number;
			seconds: number;
		}>;
		range: {
			date: string;
			start: string;
			end: string;
			text: string;
			timezone: string;
		};
	}>;
	cumulative_total: {
		seconds: number;
		text: string;
	};
	daily_average: {
		seconds: number;
		text: string;
	};
}

interface WakatimeStatsItemBase {
	name: string;
	total_seconds: number;
	percent: number;
	digital: string;
	text: string;
	hours: number;
	minutes: number;
}

interface WakatimeStatsItemWithSeconds extends WakatimeStatsItemBase {
	seconds: number;
}

interface WakatimeStatsMachineItem extends WakatimeStatsItemWithSeconds {
	machine_name_id: string;
}

interface WakatimeBestDay {
	date: string;
	text: string;
	total_seconds: number;
}

interface WakatimeStatsData {
	total_seconds: number;
	total_seconds_including_other_language: number;
	human_readable_total: string;
	human_readable_total_including_other_language: string;
	daily_average: number;
	daily_average_including_other_language: number;
	human_readable_daily_average: string;
	human_readable_daily_average_including_other_language: string;
	categories: WakatimeStatsItemBase[];
	projects: WakatimeStatsItemBase[];
	languages: WakatimeStatsItemWithSeconds[];
	editors: WakatimeStatsItemWithSeconds[];
	operating_systems: WakatimeStatsItemWithSeconds[];
	dependencies: WakatimeStatsItemWithSeconds[];
	machines: WakatimeStatsMachineItem[];
	best_day: WakatimeBestDay;
	range: string;
	human_readable_range: string;
	holidays: number;
	days_including_holidays: number;
	days_minus_holidays: number;
	status: string;
	percent_calculated: number;
	is_already_updating: boolean;
	is_coding_activity_visible: boolean;
	is_language_usage_visible: boolean;
	is_editor_usage_visible: boolean;
	is_category_usage_visible: boolean;
	is_os_usage_visible: boolean;
	is_stuck: boolean;
	is_including_today: boolean;
	is_up_to_date: boolean;
	start: string;
	end: string;
	timezone: string;
	timeout: number;
	writes_only: boolean;
	user_id: string;
	username: string;
	created_at: string;
	modified_at: string;
}

export interface WakatimeStatsResponse {
	data: WakatimeStatsData;
}
