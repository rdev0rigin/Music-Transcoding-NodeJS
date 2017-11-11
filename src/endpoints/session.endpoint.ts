import {LoginManager} from '../auth/login.manager';
import {storeManager} from '../managers/store.manager';
import {JWT} from '../odm/models/json-web-token.model';
import {SoundInfoModel} from '../odm/models/sound-info.model';
import {RSocketResponse} from '../models/response-socket.model';

const loginM = new LoginManager();
const storeM = storeManager();

export function sessionEndpoints(socket: any) {

	const endpointJWT: any = (path: string, jwt: string, action: {
		verb: string,
		payload: any
	}, mainFunction: any) => {
		socket.on(path, async () => {
			const {sessionId}: any = loginM.jwtVerify(jwt);
			if (sessionId){
				const response = mainFunction();
				if (response.ok){
					socket.emit(`${path}::CLIENT_${sessionId}`, response);
				} else {
					socket.emit(`${path}::CLIENT_${sessionId}`, response);
				}
			} else {
				socket.emit(`${path}::CLIENT_${sessionId}`, {
					ok: false,
					message: `Error with ${path}.`,
				});
			}
		});
	};

	socket.on('SESSION_AUTH', async (jwt: any, sessionId: string) => {
		if (loginM.jwtVerify(jwt)) {
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {ok: true});
		} else {
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {
				ok: false,
				message: 'Failed to get track by prop.',
			});
		}
	});

	socket.on('REGISTER_NEW_SOUND', async (payload: {jwt: string, sessionId: string, formData: SoundInfoModel}) => {
		console.log('Register New Sound\n', payload);
		const JWT: JWT | any = await loginM.jwtVerify(payload.jwt);
		console.log('JWT \n', JWT);
		if (JWT.ok) {
			const rSResponse = await storeM.registerNewSound(payload.formData);
			console.log('rsResponse', rSResponse);
			socket.emit(`SESSION_AUTH::CLIENT_${JWT.decoded.sessionId}`, rSResponse);
		} else {
			socket.emit(`SESSION_AUTH::CLIENT_${payload.sessionId}`, {
				ok: false,
				message: 'JsonWebToken not valid.',
			});
		}
	});

	socket.on('SESSION::UPLOAD_TRACK_FILE', async (payload: {jwt: string, sessionId: string, formData: any}) => {
		const JWT: RSocketResponse = await loginM.jwtVerify(payload.jwt);
		if(JWT.ok && JWT.payload.sessionId === payload.sessionId) {
			const {trackId, type, encoding, file} = payload.formData;
			const uploadResult = await storeM.uploadTrackFile(trackId, type, encoding, file)
				.catch(err => console.log('err upload', err));
			socket.emit(`SESSION::UPLOAD_TRACK_FILE::CLIENT_${JWT.payload.sessionId}`, uploadResult);
		} else {
			socket.emit(`SESSION::UPLOAD_TRACK_FILE::CLIENT_${payload.sessionId}`,
				{
					payload: payload.formData,
					ok: false,
					message: 'JWT is invalid.',
				});
			}
		});

	socket.on('SESSION::UPLOAD_VIDEO', async (jwt: string, sessionId: string) => {
		if (await loginM.jwtVerify(jwt)) {
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {ok: true});
		} else {
			socket.emit(`SESSION_AUTH::CLIENT_${sessionId}`, {
				ok: false,
				message: 'JWT is invalid.',
			});
		}
	});
}