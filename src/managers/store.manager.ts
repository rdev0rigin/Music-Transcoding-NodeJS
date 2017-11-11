import {TrackDataSchema} from '../odm/models/track.model';
import mongoose = require('mongoose');
import {StoreManifest} from '../odm/models/manifest.model';
import {Document} from 'mongoose';
import {SoundInfoModel, SoundInfoSchema} from '../odm/models/sound-info.model';
import {TrackDataBufferSchema} from '../odm/models/track-data.model';
var Track = mongoose.model('Track', TrackDataSchema);
var Manifest = mongoose.model('Manifest', StoreManifest);
var SoundInfo = mongoose.model('SoundInfo', SoundInfoSchema);
var TrackData = mongoose.model('TrackData', TrackDataBufferSchema);


export interface TrackForm {
	title: string;
	key: string;
	route: string;
	slug: string;
	mode: string;
}

export interface TrackFiles {
	mp3Data: string;
	mp4Data: string;
	imgData: string;
	imgURL: string;
	soundURL: string;
	videoURL: string;
}

export interface StoreManager {
	getTrackByProp(prop: {}): Promise<Document | null>;

	getAllSoundsInfo(): Promise<Document[] | undefined>;

	getStreamById(): any;

	createWith(payload: any, type: string): Promise<any>;

	registerNewSound(formData: SoundInfoModel): Promise<Document>;

	registerNewTrack(formData: TrackForm, fileData: TrackFiles): Promise<Document>;

	updateTrackRecord(payload: any, prop: { [key: string]: any }): Promise<Document | null | undefined>

	updateByProp(payload: any, prop: { [key: string]: any }, type: string): Promise<any>;

	getWholeFile(prop: {[key: string]:string}, type: string): Promise<any>;

	uploadTrackFile(trackId: string, type: string, encoding: string, file: any ): Promise<any>
}

export function storeManager(): StoreManager {
	// update resource index
	async function uploadFile(fileProp: {[key: string]: any}, id?: string): Promise<Buffer> {
		const key = Object.keys(fileProp)[0];
		return new Buffer(fileProp[key], 'base64');
	}

	return {
		getTrackByProp: async (prop: { [key: string]: any }) => {
			return await Track.findOne(prop);
		},
		getAllSoundsInfo: async () => {
			return await SoundInfo.find();
		},
		getStreamById: () => {
			//  const { Writable } = require('stream');
			//  const myWritable = new Writable({
			// 	write(chunk, encoding, callback) {
			// 		// ...
			// 	},
			// 	writev(chunks, callback) {
			// 		// ...
			// 	}
			// });
			// const readable = new ReadableStream()
		},
		createWith: async (payload: any, type: string): Promise<Document[] | void> => {
			const model = getModel(type);
			if (!model){
				return void 0;
			}
			return await model.create(payload)
				.then(value => {
			})
				.catch(err => {console.log('store error', err)})
		},
		registerNewSound: async (formData: SoundInfoModel): Promise<Document> => {
			return await SoundInfo.create(formData);
		},
		registerNewTrack: async (formData: TrackForm, fileData: TrackFiles): Promise<Document> => {
			const { title, key, route, slug, mode }: any = formData;
			const { mp3Data, mp4Data, imgData, soundURL, videoURL, imgURL }: any = fileData;
			return await Track.create({
				title: title,
				key: key,
				route: route,
				slug: slug,
				mode: mode,
				mp3Data: mp3Data || '',
				mp4Data: mp4Data || '',
				imgData: imgData || '',
				imgURL: imgURL || '',
				soundURL: soundURL || '',
				videoURL: videoURL || '',
			})
		},
		updateTrackRecord: async (payload: any, prop: {[key: string]: any}) => {
			if (await Track.find(prop).update(payload) > 0) {
				return await Track.findOne(prop);
			} else {
				return void 0;
			}
		},
		updateByProp: async (payload: any, prop: {[key: string]: any }, type: string) => {
			const model = getModel(type);
			if (!model) {
				return void 0;
			}
			return await model.find(prop).update(payload).exec()
		},
		getWholeFile: async (prop: { [key: string]:string}, type: string): Promise<Document[] | void> => {
			const model = getModel(type);
			if (!model){
				return void 0;
			}
			return await model.findOne(prop)
				.catch(err => {
					console.log('store error', err)
			});
		},
		uploadTrackFile: async (trackId: string, type: string, encoding: string, file: any): Promise<any> => {
			console.log(file);
			let values: any = {
				track_id: trackId
			};
			switch(type){
				case'VIDEO':
					values = {
						...values,
						videoData: file,
					};
					break;
				case'SOUND':
					values = {
						...values,
						soundData: file,
					};
					break;
				case'IMAGE':
					values = {
						...values,
						imgData: file,
					};
					break;
				default:
					return {ok: false, message: 'No File Type Found'}
			}
			const ifTrack = await TrackData.findOne({track_id: trackId});
			console.log('ifTrack', ifTrack);
			if(ifTrack) {
				return await ifTrack.update(values);
			}
			return await TrackData.create(values);
		},
	}
}

function getModel(type: string) {
	switch (type) {
		case'TRACK':
			return Track;
		case'MANIFEST':
			return Manifest;
		default:
			console.log('error no model found of type', type);
			return null;
	}
}