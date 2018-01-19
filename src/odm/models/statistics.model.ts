import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface StatisticsModel {
	id?: string;
	sound_id: string;
	likes: number;
	shares: number;
	downloads: number;
	views: number;
	updates: string;
}

export const STATISTICS_SCHEMA = new Schema({
	id: String,
	likes: Number,
	shares: Number,
	downloads: Number,
	views: Number,
	updates: String,
});


