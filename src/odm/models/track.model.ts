var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export interface TrackInfo {
	id: string;
	title: string;
	key: string;
	slug: string;
	route: string;
	mode: string;
	imgURL: string;
}

export interface TrackStats {
	track_id: string;
	likes: number;
	downloads: number;
	shares: number;
	plays: number;
}

export interface TrackModel extends TrackInfo, TrackStats {
	track_id: string;
	mp3Data: string;
	mp4Data: string;

}

export const TrackDataSchema = new Schema({
	mp3Data: Buffer,
	mp4Data: Buffer,
	imgURL: String,
	imgData: Buffer,
	soundS3URL: String,
	videoS3URL: String,
});

export const TrackInfoSchema = new Schema({
	track_id: String,
	slug: String,
	mode: String,
	title: String,
	key: String,
	route: String,
});

export const TrackStatsSchema = new Schema({
	track_id: String,
	likes: Number,
	downloads: Number,
	shares: Number,
	plays: Number,
});
