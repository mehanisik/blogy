export enum ResponseStatus {
	SUCCESS = "success",
	ERROR = "error",
}

export type Cache<T> = {
	timestamp: number;
	data: T;
};

type SuccessResponse<T> = {
	timestamp: number;
	status: ResponseStatus.SUCCESS;
	data: T;
};

type ErrorResponse = {
	code: string;
	timestamp: number;
	status: ResponseStatus.ERROR;
	message: string;
};

type Response<T> = SuccessResponse<T> | ErrorResponse;

export type ActionResponse<T> = Response<T>;
