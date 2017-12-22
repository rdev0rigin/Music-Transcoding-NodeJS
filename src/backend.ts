import * as https from 'https';
import dbConfig = require('./odm/db.config');
import {storeManager} from './managers/store.manager';
import {publicEndpoints} from './endpoints/public.endpoint';
import Socket = SocketIO.Socket;
import {LoginManager} from './auth/login.manager';
import {sessionEndpoints} from './endpoints/session.endpoint';
import * as fs from 'fs-extra';

export class BackendServices {
	private server: https.Server;
	private port: number = 2820;
	private socket: SocketIO.Server = require('socket.io')(2820, {
		secure: true,
		maxHttpBufferSize: 1024 * 1024 * 1024,
	});
	private clients: {}[] = [];
	private storeManager: any;
	private loginManager: LoginManager;
	private generalAPI: any;
	private sessionAPI: any;

	public static bootstrap(): BackendServices {
		return new BackendServices();
	};

	constructor() {
		this.init();
		this.setupWS();
		dbConfig();
	};

	private setupWS(): void {
		this.socket.on('connect', (socket: Socket) => {
			this.generalAPI = publicEndpoints(socket);
			this.sessionAPI = sessionEndpoints(socket);
			this.clients = [...this.clients, socket.id];
			socket.on('disconnecting', (res: any) => {
				const index = this.clients.findIndex((value) => value === socket.id);
				console.log(`Client DC'd`);
				this.clients.splice(index, 1)
			});
		});
	}

	private init(): void {
		this.server = https.createServer({
			cert: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/certificate.pem'),
			key: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/key.pem')
		});
		this.server.listen(this.port, 'localhost');
		this.storeManager = storeManager();
		this.loginManager = new LoginManager();
	}
}

export default BackendServices;
