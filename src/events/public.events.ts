import { StoreManager, storeManager } from '../managers/store.manager';
import { LoginManager } from '../auth/login.manager';

var storeM: StoreManager = storeManager();
var loginM: LoginManager =  new LoginManager();

export function publicEvents(socket: any) {
    socket.on(
    	'0AUTH2_TWITTER::GET_URL',
		() => {}
		);

	socket.on(
		'GET_SOUNDS_META',
		async (sessionId: string, callback: any) => {
			const info = await storeM.getAllSoundsMeta();
			console.log('details requested', info);
			if (info) {
				callback({payload: info, ok: true, event: 'GET_SOUNDS_META'});
			} else {
				callback({ok: false, message: 'Error: Could not retrieve sounds meta data.'})
			}
		}
	);

	socket.on(
		'LOGIN',
		async (payload: any, callback: (response: any) => void) => {
			const loginResponse: any = await loginM.signInUser(payload.credentials, payload.sessionId);
			callback(loginResponse);
		}
	);

	socket.on('GET_CONTENT_PACK', async (payload: {[componentName: string]: any}, callback: (response: any) => void) => {
		// callback({ok: true, data: data});
	})


}
