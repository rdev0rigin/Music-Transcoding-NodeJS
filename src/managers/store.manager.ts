import mongoose = require('mongoose');
import {Document} from 'mongoose';
import {SoundDetailsModel, SoundDetailsSchema} from '../odm/models/sound-info.model';
import {saveSound} from '../services/transcoding.service';

export interface StoreManager {

	getSoundDetails(condition: {[key: string]: any}): Promise<Document[]>;

	getAllSoundsDetails(): Promise<Document[] | undefined>;

	registerNewSound(formData: SoundDetailsModel, userID: string): Promise<Document>;

	updateSoundByProp(id: string, prop: {[prop:string]: any}): Promise<any>;
}

const SoundInfo = mongoose.model('SoundInfo', SoundDetailsSchema);

export function storeManager(): StoreManager {

	return {
		getSoundDetails: async (props: {[prop: string]: any}): Promise<Document[]> => {
			return SoundInfo.find(props);
		},

		getAllSoundsDetails: async () => {
			return await SoundInfo.find();
		},

		registerNewSound: async (formData: SoundDetailsModel | any, userID): Promise<any> => {
			const {title, description} = formData;
			const registered = await SoundInfo.create({title: title, description: description});
			if (registered){
				return saveSound(userID, registered._id, formData.soundFile);
			} else {
				console.log('error registering sound', registered);
				return {ok: false, message: registered};
			}
		},

		updateSoundByProp: async (id: string, prop: {[prop:string]: any}): Promise<any> => {
			console.log('update', id, prop);
			const soundDoc: any = await SoundInfo.findById(id)
				.catch((err: any) => console.log('sound', err));
			if(soundDoc){
				return soundDoc.update(prop)
					.catch((err: any) => console.log('update' ,err));
			} else {
				return {ok: false, message: 'Error: No Matching Sound ID'};
			}
		}
	};
}