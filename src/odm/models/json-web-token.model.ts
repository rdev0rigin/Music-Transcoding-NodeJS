export interface JWT {
	id?: string;
	sessionId: string;
	userId: string;
	email: string;
	expiry: string | number | Date;
}