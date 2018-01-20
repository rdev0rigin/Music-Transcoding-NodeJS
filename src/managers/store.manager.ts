import mongoose = require('mongoose');
import {SoundMetaModel, SoundMetaSchema} from '../odm/models/sound-info.model';
import {uploadSound} from '../services/transcoding.service';
import {StatisticsModel, STATISTICS_SCHEMA} from '../odm/models/statistics.model';
import {MetricsModel, MetricsSchema} from '../odm/models/metrics.model';
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

	getSoundMeta(condition: {[key: string]: any}): Promise<StoreResponse>;

	getAllSoundsMeta(): Promise<StoreResponse>;

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
		async setMetrics(soundId: string, metric: {}): Promise<number | StoreResponse> {
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
		async createNewMetrics(metrics: MetricsModel): Promise<StoreResponse> {
			const mResponse =  await METRICS.create(metrics)
				.catch(err => console.log('Error: Getting Metrics', err));
			if (mResponse){
				return {ok: true, payload: mResponse}
			} else {
				return {ok: false, message: 'Error: No Metrics Found'};
			}
		},
		async getSoundStats(soundId: string): Promise<StoreResponse> {
			return await STATS
				.findById(soundId)
				.catch(err => console.log('Error: Getting STATS', err));
		},
		async setSoundStats(soundId: string, stat: StatisticsModel): Promise<number | StoreResponse> {
			return await STATS
				.findById(soundId)
				.update({...stat, sound_id: soundId})
				.catch(err => console.log('Error: Setting STATS', err));

		},
		async createNewStats(stats: StatisticsModel): Promise<StoreResponse>{
			return await STATS.create(stats)
				.catch(err => console.log('Error: Getting STATS', err));
		},

		async getSoundMeta(props: {[prop: string]: SoundMetaModel}): Promise<StoreResponse> {
			return SOUND_META.find(props)
				.catch(err => console.log('Error: Getting STATS', err));
		},
		async getAllSoundsMeta(): Promise<StoreResponse>{
			return await SOUND_META.find()
				.catch(err => console.log('Error: Getting STATS', err));
		},
		async registerNewSound(formData: SoundMetaModel | any, userID): Promise<StoreResponse | {}> {
			const registered = await SOUND_META.create({...formData, user_id: userID});
			if (registered){
				return {ok: true, payload: registered}
			} else {
				// console.log('error registering sound', registered);
				return {ok: false, message: registered};
			}
		},
		async updateSoundByProp(id: string, prop: {[prop:string]: any}): Promise<StoreResponse> {
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
