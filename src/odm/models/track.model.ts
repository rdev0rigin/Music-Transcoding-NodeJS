var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export interface TrackInfo {
	id: string;
	title: string;
	key: string;
	slug: string;
	route: string;
	mode: string;
}

export interface TrackStats {
	track_id: string;
	likes: number;
	downloads: number;
	shares: number;
	plays: number;
}

export interface TrackModel extends TrackInfo, TrackStats {
	id: string;
	mp3Data: Buffer;
	mp4Data: Buffer;
	imgData: Buffer;
	imgURL: string;
	soundS3URL: string;
	videoS3URL: string;
}

export const TrackDataSchema = new Schema({
	id: String,
	mp3Data: Buffer,
	mp4Data: Buffer,
	imgData: Buffer,
	imgURL: String,
	soundURL: String,
	videoURL: String,
	slug: String,
	mode: String,
	title: String,
	key: String,
	route: String,
});

export const TrackStats = new Schema({
	likes: Number,
	downloads: Number,
	shares: Number,
	plays: Number,
});
