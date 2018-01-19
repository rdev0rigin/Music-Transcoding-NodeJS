import {dbStart} from './odm/db.config';
declare type SocketIOEndPoints = any;
import * as https from 'https';
import * as fs from 'fs-extra';
import Socket = SocketIO.Socket;
import { StoreManager, storeManager } from './managers/store.manager';
import { publicEvents } from './events/public.events';
import { privateEvents } from './events/private.events';


export class BackendServices {
	private db;
	private server: https.Server;
	private port = 2820;
	private socket: SocketIO.Server = require('socket.io')(2820, {
		secure: true,
		transports: ['websocket'],
	});
		// .origins('http://localhost:3000');
	private clients: string[] = [];
	private storeManager: StoreManager;
	private publicEvents: SocketIOEndPoints;
	private privateEvents: SocketIOEndPoints;

	public static bootstrap(): BackendServices {
		return new BackendServices();
	};

	constructor() {
		this.init();
		this.setupWS();
	};

	private setupWS(): void {
		this.socket.on('connect', (socket: Socket) => {
			console.log('client connected', socket.id);
			this.publicEvents = publicEvents(socket);
			this.privateEvents = privateEvents(socket);
			this.clients = [...this.clients, socket.id];

			socket.on('disconnecting', (res: any) => {
				const index = this.clients.findIndex((value) => value === socket.id);
				console.log(`Client DC'd`);
				this.clients.splice(index, 1);
			});
		});
	}

	private init(): void {
		this.db = dbStart();
		this.server = https.createServer({
			cert: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/certificate.pem'),
			key: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/key.pem')
		});
		this.server.listen(this.port, 'localhost');
		this.storeManager = storeManager();
	}
}

export default BackendServices;
