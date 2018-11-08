const express = require('express');
const mongoose = require('mongoose');

const validate = require('../lib/validate');
const { Genre } = require('../models/genre');
const Movie = require('../models/movie');

const router = express.Router();

// get all movies
router.get('/', async (req, res) => {
	const movies = await Movie.find().sort('title');

	res.send(movies);
});

// get movie by id
router.get('/:id', async (req, res) => {
	const movie = await Movie.findOne({ _id: req.params.id });

	return movie ? res.send(movie) : res.status(404).send('Movie does not exist.');
});

// post movie
router.post('/', async (req, res) => {
  const { error } = validate.movie(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOne({ _id: req.body.genreId })
  if (!genre) return res.status(404).send('Genre does not exist.')

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      genre: genre.genre 
    },
    numberInStock: req.body.numberInStock,
    dailyRentalrate: req.body.dailyRentalrate
  })

  movie = await movie.save();

  res.send(movie)

})

// update movie
router.put('/:id', async (req, res) => {
  const { error } = validate.movie(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
})

// delete

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;