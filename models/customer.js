const mongoose = require('mongoose')

const Customer = mongoose.model(
	'Customer',
	new mongoose.Schema({
		name: {
			type: String,
			minlength: 5,
			maxlength: 50,
			trim: true,
			required: true
		},
		phone: {
			type: String,
			minlength: 7,
			maxlength: 11,
			required: true
		},
		isGold: {
			type: Boolean,
			required: true,
			default: false
		}
	})
);

module.exports = Customer