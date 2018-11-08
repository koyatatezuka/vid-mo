const express = require('express');
const mongoose = require('mongoose');

const { genres, customers, movies } = require('./routes/index');

const app = express();

// connect to mongodb
mongoose
	.connect(
		'mongodb://localhost/vidmo',
		{ useNewUrlParser: true }
	)
	.then(() => console.log('Connected to mongodb...'))
	.catch(() => console.log('Could not connect to mongodb...'));

// PORT
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

// start server listen
app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}`);
});
