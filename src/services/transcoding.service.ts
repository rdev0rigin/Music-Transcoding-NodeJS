import {saveToDir} from '../managers/fs.manager';
import {encodeAudioToFLAC, encodeAudioToMP3} from './ffmpeg.service';
import {storeManager, StoreManager} from '../managers/store.manager';
import * as fs from 'fs-extra';
import * as Path from 'path';
import {RSocketResponse} from '../models/response-socket.model';
import crypto = require('crypto');

export async function saveSound(userID: string, soundID: string, file: any): Promise<RSocketResponse | {} > {
	return new Promise(async (resolve, reject) => {
		let header = '';
		const store: StoreManager = storeManager();

		for (let bit of file.subarray(0, 4)) {
			header += bit.toString(16);
		}

		const path: string = `${process.env.PWD}/dcm-file-store/${soundID}`;
		const MIME: string = HEADER_TO_MIME(header);
		const outPath = `${process.env.PWD}/dcm-file-store/${soundID}`;
		const saveResult = await
			saveToDir(
				`${path}/source`,
				`${soundID}.${MIME}`,
				file
			);

		if (saveResult.ok) {
			const flacSaved = await
				encodeAudioToFLAC(
					soundID,
					`${saveResult.path}/${saveResult.fileName}`,
					`${outPath}/flac/`
				);
			const mp3Encoded = await
				encodeAudioToMP3(
					soundID,
					`${saveResult.path}/${saveResult.fileName}`,
					`${outPath}/mp3/`
				);
			console.log('hit saveSound after mp3', mp3Encoded);
			const mp3File: Buffer = await
				fs.readFile(
					Path.join(process.env.PWD,
						'dcm-file-store',
						soundID,
						`mp3`,
						`${soundID}.mp3`
					));

			const fileHash = crypto.createHash('sha256')
				.update(file);

			const mp3Hash = crypto.createHash('sha256')
				.update(mp3File);
			const doc: Document = await
				store.updateSoundByProp(
					soundID,
					{
						sourceHash: fileHash.digest('hex'),
						mp3Hash: mp3Hash.digest('hex')
					});
			if(mp3Hash && fileHash){
				resolve({ok: true, body: {path: saveResult.path, details: doc}});
			} else {
				reject({ok: false, message: 'Error transcoding'});

			}
		} else {
			reject({ok: false, message: saveResult as any});
		}
	});
}

function HEADER_TO_MIME(header: string): string {
	switch (header.slice(0, 6)) {
		case'464f52':
			return 'aif';
		case'494433':
			return 'mp3';
		case'524946':
			return 'wav';
		case'664C61':
			return 'flac';
		case'000001':
			return 'mp4';
		default:
			return 'unknown';
	}
}
