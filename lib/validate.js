const Joi = require('joi');

// validate container
const validate = {};

// genre
validate.genre = function(genre) {
   // validate if string and has length of at least 3
   const schema = {
    genre: Joi.string().min(3).required()
  }

  return Joi.validate(genre.body, schema)
}

// customers
validate.customer = function(customer) {

  const schema = {
    name: Joi.string().min(5).required(),
    phone: Joi.number().min(10).required(),
    isGold: Joi.boolean().required()
  }

  return Joi.validate(customer.body, schema)
}

validate.movie = function(movie) {
  const schema = {
    title: Joi.string().required(),
    genre: Joi.object().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  }

  return Joi.validate(movie.body, schema)
}

module.exports = validate;