const mongoose = require('mongoose');

const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: true
  },
  genre: {
    type:  genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    default: 0
  } 
}));

module.exports = Movie;
