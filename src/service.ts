import * as https from 'https';
import * as express from 'express';
import dbConfig = require('./odm/db.config');
import {storeManager} from './managers/store.manager';
import {publicEndpoints} from './endpoints/public.endpoint';
import Socket = SocketIO.Socket;
import {LoginManager} from './auth/login.manager';
import {sessionEndpoints} from './endpoints/session.endpoint';
import * as fs from 'fs';

export class BackendServices {
	private app: express.Application = express();
	private server: https.Server;
	private port: number = 2820;
	private socket: SocketIO.Server = require('socket.io')(2820, {

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
		this.clients = [...this.clients, socket];
		var index = this.clients.length - 1;
			socket.on('disconnecting', () => {
				console.log('index on close', index);
				this.clients.splice(index, 1)
			});
		});
	}

	private init(): void {
		this.server = https.createServer({

			cert: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/certificate.pem'),
			key: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/key.pem')
		}, this.app);
		this.server.listen(this.port, 'localhost');
		this.storeManager = storeManager();
		this.loginManager = new LoginManager();
	}
}

export default BackendServices;
