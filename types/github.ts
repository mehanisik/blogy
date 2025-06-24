export interface GitHubUser {
	login: string;
	id: number;
	avatar_url: string;
	name: string;
	bio: string;
	public_repos: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	updated_at: string;
	created_at: string;
	topics: string[];
	private: boolean;
	fork: boolean;
}

export interface GitHubEvent {
	id: string;
	type: string;
	actor: {
		login: string;
		avatar_url: string;
	};
	repo: {
		name: string;
	};
	payload: {
		action?: string;
		ref?: string;
		ref_type?: string;
		description?: string;
		push_id?: number;
		size?: number;
		distinct_size?: number;
		head?: string;
		before?: string;
		commits?: Array<{
			sha: string;
			message: string;
			author: {
				name: string;
				email: string;
			};
		}>;
	};
	created_at: string;
}
