import {UserModel} from '../odm/models/user.model';
import {SECRET} from '../_local.credentials';
import mongoose = require('mongoose');
import {JWT} from '../odm/models/json-web-token.model';

var bcrypt = require('bcryptjs');
var JSONWebToken = require('jsonwebtoken');

export class LoginManager {

	public User = mongoose.model('User', UserModel);

	constructor(){
		// this.User.create({
		// 	username: 'ADMIN-NOCEBO',
		// 	password: this.hashPassword('dementedGrapefruit00')
		// }).then(res => res);
	}

	private hashPassword(password: string): string {
		return bcrypt.hashSync(password, 8);
	}

	private async validatePassword(password: string, username: string): Promise<boolean> {
		const user: any = await this.User.findOne({username: username});
		console.log('user', user);
		if (user) {
			return bcrypt.compareSync(password, user.password);
		}
		return false;
	}

	private returnSessionToken(sessionId: string): string {
		return JSONWebToken.sign({createdWith: sessionId, user: 'ADMIN'}, SECRET)
	}

	public signInUser(credentials: { username: string, password: string }, sessionId: string) {
		return this.validatePassword(credentials.password, credentials.username)
			.then(isValid => {
				console.log('isValid', isValid);
				if (isValid) {
					console.log('logged in ', credentials);
					return {ok: true, jwt: this.returnSessionToken(sessionId)};
				} else {
					console.log('logged in failed', credentials);
					return {ok: false, message: 'Credentials did not match.'};
				}
			})
	}

	public async jwtVerify(jwt: string): Promise<JWT> {
		return new Promise((resolve, reject) => {

		function callback(err: any, decoded: JWT){
			if(err){
				reject(err);
			}
			resolve(decoded)
		}
		JSONWebToken.verify(jwt, callback);
		})
	}
}