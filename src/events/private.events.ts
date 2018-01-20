import {LoginManager} from '../auth/login.manager';
import {storeManager} from '../managers/store.manager';
import {SoundMetaModel} from '../odm/models/sound-info.model';
import {uploadSound} from '../services/transcoding.service';
import Socket = SocketIO.Socket;
import {RSocketResponse} from '../models/response-socket.model';

const loginM = new LoginManager();
const storeM = storeManager();

export function privateEvents(socket: Socket) {

	socket.on('PRIVATE::AUTHORIZE', async (payload: any, callback: any) => {
		const jwtResponse: any = await loginM.jwtVerify(payload.jwt, payload.sessionId)
			.catch(err => {
				console.log('Error: JWT Validation', err);
				callback(err);
			});
		if (jwtResponse.ok) {
			callback({
				ok: true
			})
		} else {
			callback({
				ok: false,
				message: 'Not Authorized'
			});
		}
	});

	socket.on('PRIVATE::NEW_SOUND_META', async (payload: {jwt: string, sessionId: string, soundMeta: SoundMetaModel}, callback: (response: any) => void) => {
		// console.log('new sound Meta', payload);
		const jwtResponse: any = await loginM.jwtVerify(payload.jwt, payload.sessionId);
		if (jwtResponse.ok) {
			const rSResponse = await storeM.registerNewSound(payload.soundMeta, jwtResponse.payload.uid);
			callback(rSResponse);
		} else {
			callback({
				ok: false,
				message: 'JsonWebToken not valid.',
			});
		}
	});

	socket.on('PRIVATE::UPDATE_SOUND_META', async (payload: any, callback: (response: any) => void) => {
		const jwtResponse: any = await loginM.jwtVerify(payload.jwt, payload.sessionId);
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

	socket.on('PRIVATE::FILE_UPLOAD', async (payload: any, ack: (responseTransport: any) => void) => {
		console.log('File upload called', payload);
		const jwtResponse = await loginM.jwtVerify(payload.jwt, payload.sessionId);
		console.log('jwt', jwtResponse);
		if (jwtResponse.ok){
			const response = await uploadSound(jwtResponse.payload.uid, payload.sound_id, payload.data)
				.catch(err => console.log('Error: Saving sound to system.', err));
			ack(response);
		} else {
			ack({ok: false, message: 'JWT not valid. Please log in again.'});
		}
	});

	socket.on('PRIVATE::DELETE_SOUND', async (payload: any, callback: (response) => void) => {
		const jwtResponse = await loginM.jwtVerify(payload.jwt, payload.sessionId);
		if (jwtResponse.ok) {
			const response = storeM.deleteSoundById(payload.id);
			if (response) {
				callback({
					ok: true,
					payload: {
						response: {
							...response,
							sound_id: payload.id
						},
					}
				});
			} else {
				callback({ok: false, message: 'Error: Remove operation failed.'})
			}
		}
	});

	socket.on('PRIVATE::SET_STAT', async (payload: any, callback: (response: any) => void) => {
		const jwtResponse = await loginM.jwtVerify(payload.jwt, payload.sessionId);
		if (jwtResponse.ok) {
			const rSResponse = await storeM.setSoundStats(payload.sound_id, payload.stat);
			callback(rSResponse);
		} else {
			callback({
				ok: false,
				message: 'JsonWebToken not valid.',
			});
		}
	});

	socket.on('PRIVATE::SET_METRICS', async (payload: any, callback: (response: any) => void) => {
		const jwtResponse: RSocketResponse = await loginM.jwtVerify(payload.jwt, payload.sessionId);
		if (jwtResponse.ok) {
			const rSResponse: any = await storeM.setMetrics(payload.sound_id, payload.metrics);
			console.log(rSResponse);
			callback(rSResponse);
		} else {
			callback({
				ok: false,
				message: 'JsonWebToken not valid.',
			});
		}
	});

}
