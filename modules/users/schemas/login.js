const joi = require('@hapi/joi')

const schema = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
  }
}

module.exports = {
  schema
}
