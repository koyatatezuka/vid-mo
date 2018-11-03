const express = require('express');

const validate = require('./validate');

const app = express();
// PORT
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// genres
const genres = [
	{ genre: 'horror' },
	{ genre: 'comedy' },
	{ genre: 'sci-fi' },
	{ genre: 'action' },
	{ genre: 'documentary' },
	{ genre: 'anime' },
	{ genre: 'kids' }
];

// handle get request for all genres
app.get('/api/genres', (req, res) => {
	res.send(genres);
});

// handle get request for specific genre
app.get('/api/genres/:genre', (req, res) => {
	const genre = genres.find(genre => genre.genre === req.params.genre);

	return genre ? res.send(genre) : res.status(404).send('Gerne does not exist.');
});

// handle POST request
app.post('/api/genres', (req, res) => {
	// validate if body of post is acceptable
	const { error } = validate(req.body);
	// return 400 if invalid genre post
	if (error) return res.status(400).send(error.details[0].message);
	// pull genre name from body and push to genres array
	const genre = { genre: req.body.genre };

	genres.push(genre);
	// what genre was added
	res.send(genre);
});

// handle PUT requests
app.put('/api/genres/:genre', (req, res) => {
	// find matching genre and return 404 if one does not exist
	const genre = genres.find(genre => genre.genre === req.params.genre);

	if (!genre) return res.status(404).send('Genre does not exist');

	// validate
	// if invalid return 400
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	//update genre
	genre.genre = req.body.genre;
	res.send(genre);
});

// handle DELETE request
app.delete('/api/genres/:genre', (req, res) => {
	// find matching genre and return 404 if one does not exist
	const genre = genres.find(genre => genre.genre === req.params.genre);

	if (!genre) return res.status(404).send('Genre does not exist');

	// find index of genre
	const index = genres.indexOf(genre);

	// delete genre
	genres.splice(index, 1);
	res.send(genre);
});

// start server listen
app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}`);
});
