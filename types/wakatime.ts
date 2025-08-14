export interface WakatimeAllTimeResponse {
	data: {
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
	};
}

export interface WakatimeStatsResponse {
	data: {
		total_seconds: number;
		human_readable_total: string;
		daily_average: number;
		human_readable_daily_average: string;
		languages: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			text: string;
		}>;
		projects: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			text: string;
		}>;
		editors: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			text: string;
		}>;
		operating_systems: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			text: string;
		}>;
		categories: Array<{
			name: string;
			total_seconds: number;
			percent: number;
			text: string;
		}>;
		best_day?: {
			date: string;
			text: string;
			total_seconds: number;
		};
		range: {
			start: string;
			end: string;
			text: string;
		};
		is_up_to_date: boolean;
	};
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
