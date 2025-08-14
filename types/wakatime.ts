// WakaTime API response types
export interface WakaTimeLanguageData {
	name: string;
	percent: number;
	total_seconds: number;
}

export interface WakatimeStatsResponse {
	data: {
		languages: Array<{
			name: string;
			percent: number;
			total_seconds: number;
		}>;
	};
}

export interface WakatimeSummariesResponse {
	data: Array<{
		grand_total: {
			hours: number;
			minutes: number;
			total_seconds: number;
			text: string;
		};
		languages: WakaTimeLanguageData[];
		projects: Array<{
			name: string;
			total_seconds: number;
			percent: number;
		}>;
		range: {
			date: string;
			start: string;
			end: string;
			text: string;
			timezone: string;
		};
	}>;
	start: string;
	end: string;
}

export interface WakaTimeAllTimeData {
	text: string;
	total_seconds: number;
	is_up_to_date: boolean;
	percent_calculated: number;
	range: {
		start: string;
		start_date: string;
		start_text: string;
		end: string;
		end_date: string;
		end_text: string;
		timezone: string;
	};
}

// Server action result types
export type WakaTimeStatsResult =
	| {
			success: true;
			data: WakaTimeLanguageData[];
	  }
	| {
			success: false;
			error: string;
	  };

export type WakaTimeSummariesResult =
	| {
			success: true;
			data: WakatimeSummariesResponse;
	  }
	| {
			success: false;
			error: string;
	  };

export type WakaTimeAllTimeResult =
	| {
			success: true;
			data: WakaTimeAllTimeData;
	  }
	| {
			success: false;
			error: string;
	  };
