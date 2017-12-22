import {UserModel} from '../odm/models/user.model';
import {SECRET} from '../_local.credentials';
import mongoose = require('mongoose');
import {JWT} from '../odm/models/json-web-token.model';
import {RSocketResponse} from '../models/response-socket.model';
import {Resolve} from 'awesome-typescript-loader/dist/checker/checker';

const bcrypt = require('bcryptjs');
const JSONWebToken = require('jsonwebtoken');

export class LoginManager {

	private User = mongoose.model('User', UserModel);

	public CreateUser(): void {
		this.User.create({
			username: 'ADMIN-NOCEBO',
			password: this.hashPassword('dementedGrapefruit00')
		}).then(res => res);
	}

	private hashPassword(password: string): string {
		return bcrypt.hashSync(password, 8);
	}

	private async validatePassword(password: string, username: string): Promise<boolean> {
		const user: any = await this.User.findOne({username: username});
		if (user) {
			return bcrypt.compareSync(password, user.password);
		}
		return false;
	}

	private returnSessionToken(body: {sessionId: string, username: string, uid: string}): string {
		return JSONWebToken.sign({
			sessionId: body.sessionId,
			user: body.username,
			uid: body.uid
		}, SECRET);
	}

	public async signInUser(credentials: { username: string, password: string }, sessionId: string): Promise<RSocketResponse> {
		return await this.validatePassword(credentials.password, credentials.username)
			.then(async (isValid) => {
				if (isValid) {
					const user: any = await this.User.findOne({username: credentials.username});
					if(user){
						return {ok: true, payload: {jwt: this.returnSessionToken({sessionId: sessionId, username: user.username, uid: user._id})}};
					} else {
						return {ok: false, message: 'User not found.'}
					}
				} else {
					return {ok: false, message: 'Credentials did not match.'};
				}
		});
	}

	public async jwtVerify(jwt: string): Promise<RSocketResponse> {
		const jwtVerify = new Promise((resolve, reject): void => {
			JSONWebToken.verify(jwt, SECRET, (error: any, decoded: any) => {
				if(error){
					reject({ok: false, message: 'JWT was invalid' + error});
				}
				resolve ({ok: true, payload: decoded});
			});
		});
		return await jwtVerify as RSocketResponse;
	}
}