import * as fs from "fs-extra";
import { DB_UNPW } from '../_local.credentials';
let mongoose = require('mongoose');
const DB_Name = 'dcomp-content-store';
const DB_PATH_USER = `mongodb://${DB_UNPW.user}:${DB_UNPW.pwd}@127.0.0.1:27017/dcomp-content-store`;
const DB_PATH = `mongodb://127.0.0.1/${DB_Name}/`;
const SSL = {
	key:  fs.readFileSync(__dirname +  '/../../_local/secops/mongodb-cert.key'),
	cert: fs.readFileSync(__dirname + '/../../_local/secops/mongodb-cert.crt')
};

export function dbStart() {
	const db = mongoose.connect(DB_PATH_USER, {
		auth: {
			authdb: 'admin'
		},
		useMongoClient: true,
		user: DB_UNPW.user,
		pass: DB_UNPW.pwd,
		ssl: true,
		sslValidate: false,
		sslKey: SSL.key,
		sslCert: SSL.cert
	});
	mongoose.Promise = require('bluebird');
	const collection = new mongoose.Collection('dcomp-content-store', db, {

	});
	db.on('error',(evt) => console.log('connection error', evt));
	db.once('open', (evt) => {
		console.log('Db Connected!');
		// new LoginManager().CreateUser().then(res => {
		// 	console.log('create user', res);
		// });
	});
	db.useDb(DB_Name);
}
