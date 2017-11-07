export interface JWT {
	sessionId: string;
	userId: string;
	email: string;
	expiry: string | number | Date;
	payload?: any;
}