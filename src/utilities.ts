import * as http from 'http';
import {IncomingMessage} from 'http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {TWITTER} from './_local.credentials';
import * as request from 'request';

export async function RESTRequest(verb: string, path: string, header?: {}){
	const port = 1728;
	Observable.create((observer: Observer<any>) => {
		const options = {
			"method": verb,
			"port": port,
			"path": path,
			"header": header || {}
		};
		http.get(options, (response:IncomingMessage) => {
				response.on('data', (d) => {
					observer.next(d)
				});
				response.on('end', () => {
					observer.complete()
				})
			});
		});
}



// The request must include an Authorization header with the value of Basic <base64 encoded value from step 1>.
// The request must include a Content-Type header with the value of application/x-www-form-urlencoded;charset=UTF-8.
// The body of the request must be grant_type=client_credentials.

export function getTokenAndURL() {
	const buf0 = new Buffer(TWITTER.APIkey, 'base64');
	const buf1 = new Buffer(TWITTER.secret, 'base64');

	const credentials = buf0.toString() + '.' + buf1;
	request({
		port: 2821,
		method: 'POST',
		url: 'https://api.twitter.com/oauth/request_token',
		headers: {
			"oauth_callback":"http://localhost:3000/code",
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: `grant_type=${TWITTER.APIkey}:${TWITTER.secret}`

	}, (res) => {

			console.log('response', res)
	});
}

getTokenAndURL();
