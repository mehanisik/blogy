export interface GitHubEvent {
	id: string;
	type: string;
	actor: {
		id: number;
		login: string;
		display_login: string;
		gravatar_id: string;
		url: string;
		avatar_url: string;
	};
	repo: {
		id: number;
		name: string;
		url: string;
	};
	payload: PushEventPayload;
	public: boolean;
	created_at: string;
}

interface PushEventPayload {
	repository_id: number;
	push_id: number;
	size: number;
	distinct_size: number;
	ref: string;
	head: string;
	before: string;
	commits: GitHubCommit[];
}

export interface GitHubCommit {
	sha: string;
	author: {
		email: string;
		name: string;
	};
	message: string;
	distinct: boolean;
	url: string;
}

export interface GitHubReadmeResponse {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url: string;
	type: "file";
	content: string;
	encoding: "base64";
}

export interface GitHubRepository {
	id: number;
	name: string;
	full_name: string;
	owner: {
		login: string;
		id: number;
		avatar_url: string;
		html_url: string;
	};
	private: boolean;
	html_url: string;
	description: string | null;
	fork: boolean;
	url: string;
	default_branch: string;
}
