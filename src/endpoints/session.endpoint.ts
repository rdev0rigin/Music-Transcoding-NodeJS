import {LoginManager} from '../auth/login.manager';
import {storeManager} from '../managers/store.manager';
import {SoundDetailsModel} from '../odm/models/sound-info.model';
import {saveSound} from '../services/transcoding.service';

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

	socket.on('REGISTER_NEW_SOUND', async (payload: {jwt: string, sessionId: string, formData: SoundDetailsModel}, callback: (response: any) => void) => {
		const jwtResponse: any = await loginM.jwtVerify(payload.jwt);
		if (jwtResponse.ok) {
			const rSResponse = await storeM.registerNewSound(payload.formData, jwtResponse.payload.uid);
			callback(rSResponse);
		} else {
			callback({
				ok: false,
				message: 'JsonWebToken not valid.',
			});
		}
	});

	socket.on('SESSION::UPDATE_SOUND_DETAIL', async (payload: any, callback: (response: any) => void) => {
		const jwtResponse: any = await loginM.jwtVerify(payload.jwt);
		if (jwtResponse.ok) {
			const rSResponse = await storeM.updateSoundByProp(payload.sound_id, payload.prop);
			callback(rSResponse);
		} else {
			callback({
				ok: false,
				message: 'JsonWebToken not valid.',
			});
		}
	});

	socket.on('SESSION::FILE_UPLOAD', async (payload: any, ack: (responseTransport: any) => void) => {
		const jwtResponse = await loginM.jwtVerify(payload.jwt);
		if (jwtResponse.ok){
			const response = await saveSound(jwtResponse.payload.uid, payload.song_id, payload.data)
				.catch(err => console.log('Error: Saving sound to system.', err));
			ack(response);
		} else {
			ack({ok: false, message: 'JWT not valid. Please log in again.'});
		}
	});
}