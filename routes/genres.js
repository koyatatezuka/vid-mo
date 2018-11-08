const express = require('express');

const validate = require('../lib/validate');
const { Genre } = require('../models/genre');

const router = express.Router();


// handle get request for all genres
router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

// handle get request for specific genre
router.get('/:id', async (req, res) => {
	const genre = await Genre.find({ _id: req.params.id})

	return genre ? res.send(genre) : res.status(404).send('Gerne does not exist.');
});

// handle POST request
router.post('/', async (req, res) => {
	// validate if body of post is acceptable
	const { error } = validate.genre(req.body);
	// return 400 if invalid genre post
	if (error) return res.status(400).send(error.details[0].message);
	// pull genre name from body and push to genres array
	let genre = new Genre({
		genre: req.body.genre
	});

	genre = await genre.save();
	// what genre was added
	res.send(genre);
});

// handle PUT requests
router.put('/:id', async (req, res) => {
	// validate
	// if invalid return 400
	const { error } = validate.genre(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	// update genre by id
	const genre = await Genre.findOneAndUpdate({ _id: req.params.id}, { genre: req.body.genre },{
		new: true
	})

	if (!genre) return res.status(404).send('Genre does not exist');

	res.send(genre);
});

// handle DELETE request
router.delete('/:id', async (req, res) => {
	// find matching genre and return 404 if one does not exist
	const genre =  await Genre.findOneAndRemove({ _id: req.params.id})

	if (!genre) return res.status(404).send('Genre does not exist');

	res.send(genre);
});

module.exports = router;
