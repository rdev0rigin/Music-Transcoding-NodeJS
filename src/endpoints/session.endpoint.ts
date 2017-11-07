import {LoginManager} from '../auth/login.manager';
import {JWT} from '../odm/models/json-web-token.model';

export function sessionEndpoints(socket: any) {
	const loginM = new LoginManager();
	socket.on('SESSION_AUTH', async ( jwt: any, sessionId: string) => {

		if (loginM.jwtVerify(jwt)){
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {ok: true, });
		} else {
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {
				ok: false,
				message: 'Failed to get track by prop.',
			});
		}
	});

	socket.on('SESSION::UPLOADING_FILE', async ( jwt: string, sessionId: string) => {

		if (loginM.jwtVerify(jwt)){
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {ok: true, });
		} else {
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {
				ok: false,
				message: 'Failed to get track by prop.',
			});
		}
	});


}