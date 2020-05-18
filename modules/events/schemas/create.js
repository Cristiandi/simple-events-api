const joi = require('@hapi/joi')

const schema = {
  body: {
    title: joi.string().min(1).required(),
    description: joi.string().min(5),
    long: joi.string().min(1).required(),
    lat: joi.string().min(1).required(),
    userId: joi.number().min(1)
  }
}

module.exports = {
  schema
}
