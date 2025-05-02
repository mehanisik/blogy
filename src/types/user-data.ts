export interface UserData {
	id: string;
	email?: string;
	user_metadata: { [key: string]: object };
	app_metadata: { [key: string]: object };
}
