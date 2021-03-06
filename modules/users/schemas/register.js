const joi = require('@hapi/joi')

const schema = {
  body: {
    username: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
  }
}

module.exports = {
  schema
}
