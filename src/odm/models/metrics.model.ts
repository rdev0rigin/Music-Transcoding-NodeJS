import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface MetricsModel {
	id?: string;
	sessionId: string;
	content_viewed: string;
	updates: string;
	stateChains: string;
}

export const MetricsSchema = new Schema({
	id: String,
	sessionId: String,
	content_viewed: String,
	updates: Number,
	stateChains: String
});

