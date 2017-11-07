var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export const UserModel = new Schema({
	username: {
		type: String,
		unique: true,
		index: true,
	},
	password: String,
	email: String,
});

