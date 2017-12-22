import * as fs from "fs-extra";

export = () => {
	let mongoose = require('mongoose');
	let db = mongoose.connection;
	console.log('pwd', __dirname, process.env.PATH.PWD);
	mongoose.connect('mongodb://localhost:27017/dcomp_store_root', {
		useMongoClient: true,
		ssl: true,
		sslValidate: false,
		sslKey: fs.readFileSync(__dirname +  '/../../_local/secops/mongodb-cert.key'),
		sslCert: fs.readFileSync(__dirname + '/../../_local/secops/mongodb-cert.crt')

	});
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', () => {
		console.log('Db Connected!');
	});
};
