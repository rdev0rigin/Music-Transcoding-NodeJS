import * as mongoose from 'mongoose';

var Schema = mongoose.Schema;

export interface SoundDetailsModel {
	id?: string;
	soundURL: string;
	videoURL?: string;
	imgURL?: string;
	title: string;
	description: string;
}

export const SoundDetailsSchema = new Schema({
	id: String,
	soundURL: String,
	videoURL: String,
	imgURL: String,
	title: String,
	description: String
});