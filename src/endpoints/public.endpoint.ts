import {StoreManager, storeManager} from '../managers/store.manager';
import {LoginManager} from '../auth/login.manager';

var storeM: StoreManager = storeManager();
var loginM: LoginManager =  new LoginManager();

export function publicEndpoints(socket: any) {
    socket.on('0AUTH2_TWITTER::GET_URL', () => {

    });
	socket.on('GET_SONG_BY_PROP', async (payload: {prop: any, sessionId: string}) => {
		console.log('get song', payload);
		const track = await storeM.getTrackByProp(payload.prop);
		if (track) {
			socket.emit(`GET_SONG_BY_PROP::CLIENT_${payload.sessionId}`, {ok: true, track: track});
		} else {
			socket.emit(`GET_SONG_BY_PROP::CLIENT_${payload.sessionId}`, {ok: false, message: 'Failed to get track by prop.'});
		}
	});

	socket.on('GET_ALL_MUSIC_DETAILS', async (sessionId: string) => {
		const info = await storeM.getAllSongsInfo();
		if (info) {
		console.log('get info', info, sessionId);
			socket.emit(`GET_ALL_MUSIC_DETAILS::CLIENT_${sessionId}`, {ok: true, ...info});
		} else {
			socket.emit(`GET_ALL_MUSIC_DETAILS::CLIENT_${sessionId}`, {ok: false, message: 'Failed to get track by prop.'});
		}
	});

	socket.on('GET_SONG_DATA', async (payload: any) => {
		const file = await storeM.getWholeFile(payload.prop, payload.type);
		if (file) {
			socket.emit(`GET_SONG_DATA::CLIENT_${payload.sessionId}`, {ok: true, file: file});
		} else {
			socket.emit(`GET_SONG_DATA::CLIENT_${payload.sessionId}`, {ok: false, message: 'Failed to get track by prop.'});
		}
	});

	socket.on('LOGIN', async (payload: any) => {
		const jwtResponse: any = await loginM.signInUser(payload.credentials, payload.sessionId);
		console.log('jwt response', jwtResponse);
		if (jwtResponse.ok) {
			socket.emit(`LOGIN::CLIENT_${payload.sessionId}`, {ok: true, jwt: jwtResponse.jwt});
		} else {
			socket.emit(`LOGIN::CLIENT_${payload.sessionId}`, {ok: false, message: jwtResponse.message});
		}
	});

}