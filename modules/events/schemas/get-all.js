const joi = require('@hapi/joi')

const schema = {
  query: {
    limit: joi.number().min(1).required(),
    skip: joi.number().min(0)
  }
}

module.exports = {
  schema
}
