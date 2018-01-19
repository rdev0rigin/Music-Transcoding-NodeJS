import * as path from 'path';
const fs = require('fs-extra');

export class StatusServer {
	private https = require('https');
	private server = this.https.createServer({
		cert: fs.readFileSync(path.join(__dirname, '_local', 'secops', 'cert', '')),
		key: fs.readFileSync(path.join(__dirname, '_local', 'secops', 'cert', 'status.server.csr.pem'))
	});
	static bootStatusServer(): void {
		new StatusServer();
	}

	constructor(){

	}
}
