const Joi = require('joi');

module.exports = (genre) => {
  // validate if string and has length of at least 3
  const schema = {
    genre: Joi.string().min(3).required()
  }

  return Joi.validate(genre.body, schema)
}