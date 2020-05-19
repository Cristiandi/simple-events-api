const joi = require('@hapi/joi')

const schema = {
  params: {
    id: joi.number().min(1).required()
  },
  body: {
    title: joi.string().min(1),
    description: joi.string().min(5),
    long: joi.string().min(1),
    lat: joi.string().min(1)
  }
}

module.exports = {
  schema
}
