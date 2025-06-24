export interface WakaTimeStats {
	data: {
		best_day?: {
			date: string;
			text: string;
			total_seconds: number;
		};
		days_including_holidays?: number;
		days_minus_holidays?: number;
		languages?: Array<{
			name: string;
			percent: number;
			text: string;
			total_seconds: number;
		}>;
		machines?: Array<{
			name: string;
			percent: number;
			text: string;
			total_seconds: number;
		}>;
		operating_systems?: Array<{
			name: string;
			percent: number;
			text: string;
			total_seconds: number;
		}>;
		projects?: Array<{
			name: string;
			percent: number;
			text: string;
			total_seconds: number;
		}>;
		total_seconds?: number;
		total_seconds_including_other_language?: number;
		user_id?: string;
		username?: string;
		human_readable_total?: string;
		human_readable_daily_average?: string;
		daily_average?: number;
		daily_average_including_other_language?: number;
	};
}

export interface WakaTimeSummary {
	data: Array<{
		grand_total: {
			daily_average: number;
			human_readable_daily_average: string;
			human_readable_total: string;
			total_seconds: number;
		};
		languages: Array<{
			name: string;
			total_seconds: number;
			percent: number;
		}>;
		projects: Array<{
			name: string;
			total_seconds: number;
			percent: number;
		}>;
		range: {
			date: string;
			end: string;
			start: string;
			text: string;
			timezone: string;
		};
	}>;
}
