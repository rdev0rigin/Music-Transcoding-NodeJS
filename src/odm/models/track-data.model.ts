var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export interface TrackDataBufferModel {
	id?: string;
	track_id: string;
	type?: string;
	soundData?: Buffer;
	videoData?: Buffer;
	imgData?: Buffer;
}

export const TrackDataBufferSchema = new Schema({
	id: String,
	track_id: {
		type: String,
		unique: true,
		index: true
	},
	soundData: String,
	videoData: String,
	imgData: String,
});

