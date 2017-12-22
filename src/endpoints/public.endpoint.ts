import {StoreManager, storeManager} from '../managers/store.manager';
import {LoginManager} from '../auth/login.manager';
import {openFile} from '../managers/fs.manager';

var storeM: StoreManager = storeManager();
var loginM: LoginManager =  new LoginManager();

export function publicEndpoints(socket: any) {

    socket.on('0AUTH2_TWITTER::GET_URL', () => {

    });

	socket.on(
		'GET_ALL_SOUNDS_DETAILS',
		async (sessionId: string, callback: any) => {
			console.log('socket ID from get?', socket.id);
			const info = await storeM.getAllSoundsDetails();
			callback({body: info, ok: true});
		}
	);

	socket.on('LOGIN', async (payload: any, callback: (response: any) => void) => {
		const rSResponse: any = await loginM.signInUser(payload.credentials, payload.sessionId);
		callback(rSResponse);
	});


	socket.on('GET_SOUND_DATA', async (payload: {[key: string]: any}, callback: (response: any) => void) => {
		const document = await storeM.getSoundDetails({_id: payload.sound_id})
			.catch(err => {console.log('coudl not find document', err)});
		const data: Buffer | any = await openFile(payload.sound_id)
			.catch(err => {console.log('file read error', err)});
		console.log('DATA \n', data.toString(), document);
		callback({ok: true, data: data});
	})
}