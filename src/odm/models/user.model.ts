const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const UserModel = new Schema({
	userName: {
		type: String,
		unique: true,
		index: true,
	},
	password: String,
	email: String,
});
