//AURA Async User Remote Assistant

import setPrototypeOf = Reflect.setPrototypeOf;

/**
 * Asynchronous Ubiquity Remote Assistant
 *
 * A module that handles and anonymously tracks inter communication of clients and services.
 * Provides helpers to stream in real time any size file or message to any part of your infrastructure
 * connected directly or indirectly to the servers. Data propagation is handled based on block chain
 * verification https://en.wikipedia.org/wiki/Blockchain and encrypts using signal protocol
 * https://en.wikipedia.org/wiki/Signal_Protocol.
 *
 * Dependencies: fs-extra, Node.JS/Browser
 *
 *
 */


export var AURA = {};
// Object.prototype(AURA).setConfig = (configObj: {[values: any]}) => {
//
// }
const AURA_CONFIG = {

};

import * as fs from 'fs-extra';
// create or validate certs and key generator
const PEM = (type: string) => {
	switch(type){
		case'key':
			// return fs.readFile()
	}
};

// set encryption helpers and wrappers

// set decryption helper

// initialize genisis or load chain list

// set chain validation helper

// chain get and constructor

// set hard store of state snap shots for crash recovery / roll back

// active client session / instances / sockets
const sessionStorePath = `${__dirname}/state/`;


// state backup
fs.writeFile(sessionStorePath + '/test.json', JSON.stringify({ bat:"foo"}), 'utf8',(err: NodeJS.ErrnoException) => {
	console.log('error?', err)
});

const fsStore = async (currentMap: Map<any, any>): Promise<any> => {
	fs.readFile(`${sessionStorePath}/rdev-aura.data`, (err: NodeJS.ErrnoException, data: Buffer) => {
		const file = data.toString('utf8');
	});
};

// unique stream responder and handler



//data builder and stream restore


