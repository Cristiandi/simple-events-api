const joi = require('@hapi/joi')

const schema = {
  query: {
    place: joi.string().min(5).required()
  }
}

module.exports = {
  schema
}
