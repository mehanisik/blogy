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
	commits: Commit[];
}

export interface Commit {
	sha: string;
	author: {
		email: string;
		name: string;
	};
	message: string;
	distinct: boolean;
	url: string;
}
