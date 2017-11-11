import * as mongoose from 'mongoose';
import {TrackInfo} from './track.model';

var Schema = mongoose.Schema;

export interface RawManifest {
	trackStats: {
 		[key: string]: TrackInfo
	}
}
export interface ManifestModel {
	_id: string;
	manifest: string;
}

export const StoreManifest = new Schema({
	manifest: String
});

