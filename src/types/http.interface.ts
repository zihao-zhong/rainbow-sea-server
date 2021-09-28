export interface ResponseInterface<T> {
	data: T;
	code: number;
	message: string;
}