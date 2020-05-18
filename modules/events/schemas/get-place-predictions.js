const joi = require('@hapi/joi')

const schema = {
  query: {
    input: joi.string().min(5).required(),
    lat: joi.string().min(1),
    long: joi.string().min(1)
  }
}

module.exports = {
  schema
}
