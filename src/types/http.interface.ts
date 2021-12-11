export interface ResponseInterface<T> {
	data: T;
	code: number;
	message: string;
}

export interface ResponseMessage<T = any> {
	resMessage: string;
	data?: T;
}