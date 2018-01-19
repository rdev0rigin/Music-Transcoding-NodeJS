import mongoose = require('mongoose');
import {Document} from 'mongoose';
import {SoundMetaModel, SoundMetaSchema} from '../odm/models/sound-info.model';
import {uploadSound} from '../services/transcoding.service';
import {StatisticsModel, STATISTICS_SCHEMA} from '../odm/models/statistics.model';
import {MetricsModel, MetricsSchema} from '../odm/models/metrics.model';
import {RSocketResponse} from '../models/response-socket.model';
import {StoreResponse} from '../../dcomp.type';

const METRICS = mongoose.model('Metrics', MetricsSchema);
const STATS = mongoose.model('Statistics', STATISTICS_SCHEMA);
const SOUND_META = mongoose.model('SoundMeta', SoundMetaSchema);

export interface StoreManager {

	// getMetrics: (soundId: string) => Promise<StoreResponse>;

	setMetrics: (soundId: string, metric: {}) => Promise<number | StoreResponse>;

	createNewMetrics: (metrics: MetricsModel) => Promise<StoreResponse>;

	getSoundStats(soundId: string): Promise<StoreResponse>;

	setSoundStats(soundId: string, stat: {}): Promise<number | StoreResponse> ;

	createNewStats(stats: StatisticsModel): Promise<StoreResponse>;

	getSoundDetails(condition: {[key: string]: any}): Promise<StoreResponse>;

	getAllSoundsDetails(): Promise<StoreResponse>;

	registerNewSound(formData: SoundMetaModel, userID: string): Promise<StoreResponse | {}>;

	updateSoundByProp(id: string, prop: {[prop:string]: any}): Promise<StoreResponse>;

	deleteSoundById(id: string): Promise<StoreResponse>;

}

export function storeManager(): StoreManager {

	return {
		// getMetrics: async (soundId: string): Promise<StoreResponse> => {
		// 	const mResponse  = await METRICS.find({sound_id: soundId})
		// 		.catch((err: string) => console.log('Error: GettingMetrics', err));
		// 		return {ok: true, payload: mResponse}
		// },
		setMetrics: async (soundId: string, metric: {}): Promise<number | StoreResponse> =>  {
			const mResponse = await METRICS
				.findById(soundId)
				.update({...metric, soundId: soundId})
				.catch(err => console.log('Error: Setting Metrics', err));
			if (mResponse){
				return {ok: true, payload: mResponse}
			} else {
				return {ok: false, message: 'Error: No Metrics Found'};
			}
		},

		createNewMetrics: async (metrics: MetricsModel): Promise<StoreResponse> => {
			const mResponse =  await METRICS.create(metrics)
				.catch(err => console.log('Error: Getting Metrics', err));
			if (mResponse){
				return {ok: true, payload: mResponse}
			} else {
				return {ok: false, message: 'Error: No Metrics Found'};
			}
		},

		getSoundStats: async (soundId: string): Promise<StoreResponse> => {
			return await STATS
				.findById(soundId)
				.catch(err => console.log('Error: Getting STATS', err));
		},

		setSoundStats: async (soundId: string, stat: StatisticsModel): Promise<number | StoreResponse> =>  {
			return await STATS
				.findById(soundId)
				.update({...stat, sound_id: soundId})
				.catch(err => console.log('Error: Setting STATS', err));

		},

		createNewStats: async (stats: StatisticsModel): Promise<StoreResponse> => {
			return await STATS.create(stats)
				.catch(err => console.log('Error: Getting STATS', err));
		},

		getSoundDetails: async (props: {[prop: string]: SoundMetaModel}): Promise<StoreResponse> => {
			return SOUND_META.find(props)
				.catch(err => console.log('Error: Getting STATS', err));
		},

		getAllSoundsDetails: async (): Promise<StoreResponse> => {
			return await SOUND_META.find()
				.catch(err => console.log('Error: Getting STATS', err));
		},

		// TODO Refactor Response to StoreResponse
		registerNewSound: async (formData: SoundMetaModel | any, userID): Promise<StoreResponse | {}>=> {
			const {title, description} = formData;
			const registered = await SOUND_META.create({title}, {description});
			if (registered){
				return uploadSound(userID, registered._id, formData.soundFile)
					.catch(err => console.log('Error: Getting STATS', err));
			} else {
				console.log('error registering sound', registered);
				return {ok: false, message: registered};
			}
		},

		updateSoundByProp: async (id: string, prop: {[prop:string]: any}): Promise<StoreResponse> => {
			console.log('update', id, prop);
			const soundDoc: any = await SOUND_META.findById(id)
				.catch((err: any) => console.log('sound', err));
			if(soundDoc){
				return soundDoc.update(prop)
					.catch((err: any) => console.log('update' ,err));
			} else {
				return {ok: false, message: 'Error: No Matching Sound ID'};
			}
		},

		async deleteSoundById(id: string): Promise<StoreResponse> {
			console.log('deleting sound', id);
			const response = await SOUND_META.remove({_id: id});
			console.log('deleted sound?', response);
			return response;
		}
	}
}
