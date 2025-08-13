import type { GitHubEvent } from "@/types/github";

export const getEventAction = (event: GitHubEvent) => {
	if (event.type === "PushEvent") return "Commited to";
	if (event.type === "PullRequestEvent") return "Opened PR in";
	if (event.type === "IssuesEvent") return "Opened issue in";
	if (event.type === "ForkEvent") return "Forked";
	return event.type.replace(/Event$/, "");
};
