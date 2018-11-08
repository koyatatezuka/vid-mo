const mongoose = require('mongoose');

// mongo data validation and create data class for Genre collection

const genreSchema = new mongoose.Schema({
	genre: {
		type: String,
		minlength: 3,
		maxlength: 50,
		trim: true,
		required: true
	}
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = {
	Genre,
	genreSchema
};
