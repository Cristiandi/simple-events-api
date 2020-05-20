const joi = require('@hapi/joi')

const schema = {
  params: {
    id: joi.number().min(1).required()
  }
}

module.exports = {
  schema
}
