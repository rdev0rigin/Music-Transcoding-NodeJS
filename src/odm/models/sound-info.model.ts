import * as mongoose from 'mongoose';

var Schema = mongoose.Schema;

export interface SoundInfoModel {
	id?: string;
	sound_id?: string;
	soundURL: string;
	videoURL?: string;
	imgURL?: string;
	title: string;
	description: string;
}

export const SoundInfoSchema = new Schema({
	id: String,
	sound_id: String,
	soundURL: String,
	videoURL: String,
	imgURL: String,
	title: String,
	description: String
});