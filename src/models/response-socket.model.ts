export interface RSocketResponse {
	ok: boolean;
	payload?: any;
	message?: string;
	path?: string;
	// [meta: string]: string;
}
