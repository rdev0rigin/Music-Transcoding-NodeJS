import * as JSONWebToken from 'jsonwebtoken';
import mongoose = require('mongoose');
import { UserModel } from '../odm/models/user.model';
import { RSocketResponse } from '../models/response-socket.model';
import {SECRET} from '../_local.credentials';
const bcrypt = require('bcryptjs');

export class LoginManager {

	private User = mongoose.model('User', UserModel);

	public async CreateUser(): Promise<any> {
		await this.User.create({
			userName: 'ADMIN-NOCEBO',
			password: this.hashPassword('dementedGrapefruit00')
		}).catch(err => console.log('error create user', err));
	}

	private hashPassword(password: string): string {
		return bcrypt.hashSync(password, 8);
	}

	private async validatePassword(password: string, userName: string): Promise<boolean> {
		const user: any = await this.User.findOne({userName: userName});
		if (user) {
			return bcrypt.compareSync(password, user.password);
		}
		return false;
	}

	private returnSessionToken(
		body: {
			sessionId: string,
			userName: string,
			uid: string
		}
	): string {
		return JSONWebToken.sign({
			sessionId: body.sessionId,
			user: body.userName,
			uid: body.uid
		}, SECRET);
	}

	public async signInUser(credentials: {userName: string, pwd: string }, sessionId: string): Promise<RSocketResponse> {
		const isValid = await this.validatePassword(credentials.pwd, credentials.userName);
		if (isValid) {
			const user: any = await this.User.findOne({userName: credentials.userName});
			if(user){
				return {
					ok: true, payload: {
						jwt: this.returnSessionToken({
							sessionId: sessionId,
							userName: user.userName,
							uid: user._id
						})
					}
				};
			} else {
				return {ok: false, message: 'User not found.'}
			}
		} else {
			return {ok: false, message: 'Credentials did not match.'};
		}
	}

	public async jwtVerify(jwt: string, sessionId: string): Promise<RSocketResponse> {
		const jwtVerify = new Promise((resolve, reject): void => {
			JSONWebToken.verify(
				jwt,
				SECRET,
				(error: any, decoded: any) => {
					if (error || (decoded.sessionId !== sessionId)) {
						reject({
							ok: false,
							message: 'JWT was invalid' + error
						});
					}
					console.log('JWT ok');
					resolve ({ok: true, payload: decoded});
				}
			);
		});
		return await jwtVerify as RSocketResponse;
	}
}
