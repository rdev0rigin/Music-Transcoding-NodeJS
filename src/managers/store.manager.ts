import {TrackDataSchema} from '../odm/models/track.model';
import mongoose = require('mongoose');
import {StoreManifest} from '../odm/models/manifest.model';
import {Document} from 'mongoose';

var Track = mongoose.model('Track', TrackDataSchema);
var Manifest = mongoose.model('Manifest', StoreManifest);

export interface StoreManager {
	getTrackByProp(prop: {}): Promise<Document | null>;

	getAllSongsInfo(): Promise<Document[] | undefined>;

	getStreamById(): any;

	createWith(payload: any, type: string): Promise<any>;

	registerNewTrack(payload: any): Promise<Document>;

	updateTrackRecord(payload: any, prop: { [key: string]: any }): Promise<Document | null | undefined>

	updateByProp(payload: any, prop: { [key: string]: any }, type: string): Promise<any>;

	getWholeFile(prop: { [key: string]:string}, type: string): Promise<any>;


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
		getAllSongsInfo: async () => {
			return await Manifest.find();
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

			}).catch(err => {console.log('store error', err)})
		},

		registerNewTrack: async (payload: any) => {
			const {mp3Data, mp4Data, imgURL, soundS3URL, videoS3URL} = payload;
			if (mp3Data) {

			}
			return await Track.create({
				mp3Data: mp3Data,
				mp4Data: mp4Data,
				imgURL: imgURL,
				soundS3URL: soundS3URL,
				videoS3URL: videoS3URL
			})
		},
		updateTrackRecord: async (payload: any, prop: {[key: string]: any}) => {
			if (await Track.find(prop).update(payload) > 0) {
				return await Track.findOne(prop);
			} else {
				return void 0;
			}
		},
		updateByProp: async (payload: any, prop: { [key: string]: any }, type: string) => {
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
				.catch(err => {console.log('store error', err)});
		}
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

const store: StoreManager = storeManager();

const data = JSON.stringify([{
	graveSon: {
		title: 'DComposeD',
		id: '123',
		key: 'graveSon',
		slug: 'grave_son',
		route: '/music/grave_son',
		mp3URL: '//s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-176659737152/dcomposed-remaster-wip.m4a',
		mp4URL: '/dcomp_wip.mp4',
		imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/c_scale,h_820,q_54/v1509156983/dcomposed-album-art_mavbxv.jpg',
		weight: 1,
		mode: 'VIDEO',
		likes: 31,
		downloads: 29,
		shares: 27,
		plays: 153,
	},
},{
	getSome: {
		title: 'Grave Son',
		id: '123',
		key: 'getSome',
		slug: 'get_some',
		route: '/music/grave_son',
		mp3URL: 'GetSOmeNom.m4a',
		mp4URL: '/dcomp_wip.mp4',
		imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
		weight: 1,
		mode: 'VIDEO',
		likes: 31,
		downloads: 29,
		shares: 27,
		plays: 153,
	},
},{
	makeSome: {
		title: 'Fitzpatrick',
		id: '123',
		key: 'fitzPatrick',
		slug: 'fitz_patrick',
		route: '/music/grave_son',
		mp3URL: '//s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-176659737152/fitzpatrick.wav',
		mp4URL: '/dcomp_wip.mp4',
		imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
		weight: 1,
		mode: 'VIDEO',
		likes: 31,
		downloads: 29,
		shares: 27,
		plays: 153,
	},
},{
	ravenFun: {
		title: 'Grave Son',
		id: '123',
		key: 'ravenFun',
		slug: 'raven_fun',
		route: '/music/grave_son',
		mp3URL: 'GetSOmeNom.m4a',
		mp4URL: '/dcomp_wip.mp4',
		imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
		weight: 1,
		mode: 'VIDEO',
		likes: 31,
		downloads: 29,
		shares: 27,
		plays: 153,
	},
},{
	greaterSum: {
		title: 'Grave Son',
		id: '123',
		key: 'greaterSum',
		slug: 'greater_sum',
		route: '/music/grave_son',
		mp3URL: 'GetSOmeNom.m4a',
		mp4URL: '/dcomp_wip.mp4',
		imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
		weight: 1,
		mode: 'VIDEO',
		likes: 31,
		downloads: 29,
		shares: 27,
		plays: 153,
	},
},{
	lessThanOne: {
		title: 'Grave Son',
		id: '123',
		key: 'lessThanOne',
		slug: 'less_than_one',
		route: '/music/grave_son',
		mp3URL: 'GetSOmeNom.m4a',
		mp4URL: '/dcomp_wip.mp4',
		imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
		weight: 1,
		mode: 'VIDEO',
		likes: 31,
		downloads: 29,
		shares: 27,
		plays: 153,
	}
}]);

store.createWith({manifest:data}, 'MANIFEST')
	.then(res => console.log('success', res));
