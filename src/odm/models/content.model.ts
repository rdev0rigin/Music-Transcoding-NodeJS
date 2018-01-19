import * as mongoose from 'mongoose';
declare type ContentType = string;
const Schema = mongoose.Schema;

export const ContentPacketSchema = new Schema({
	_id: String,
	slug: String,
	hash: String,
	type: String,
	component: String,
	encoding: String,
});

export const ContentPackSchema = new Schema({


});

export interface ContentPacket {
	slug: string;
	hash: Buffer;
	data?: {} | any[] | string;
	type: string;
	component: string;
	ok: boolean;
	message?: string;
	source?: string;
	encoding?: string;
}

export interface ContentPack {
	// type: any;
	// hash: ArrayBuffer;
	// component: string;
	[slug: string]: ContentPacket | any;
}

export interface ContentComponent {
	[componentName: string]: Map<ContentType, ContentPack>;
}

export interface ContentComponents {
	sounds: ContentComponent;
	contact: ContentComponent;
	mediaPlayer: ContentComponent;
	about: ContentComponent;
	footer: ContentComponent;
	navbar: ContentComponent;
	global: ContentComponent;
	stats: ContentComponent;
	metrics: ContentComponent;
}

export interface ContentBlock {
	history: Set<ContentBlock>;
	hash: ArrayBuffer;
	lastUpdated: Date | number;
	components: ContentComponents;
}

export interface PackBundle {
	componentName: string;
	pack: ContentPack;
}
