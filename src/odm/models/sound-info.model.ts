import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface SoundMetaModel {
	id?: string;
	soundURL?: string;
	videoURL?: string;
	imgURL?: string;
	title?: string;
	description: string;
}

export const SoundMetaSchema = new Schema({
	id: String,
	soundURL: String,
	videoURL: String,
	imgURL: String,
	title: String,
	description: String
});


