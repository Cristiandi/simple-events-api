const { throwError } = require('../utils')
const joi = require('@hapi/joi')

const validate = (data, schema) => {
  const { error } = joi.object(schema).validate(data)
  return error
}

const validationHandler = ({ schema, check = 'body' }) => {
  return (req, res, next) => {
    const error = validate(req[check], schema)

    if (error) {
      const { details } = error
      const message = details.map(i => i.message).join(',')

      return next(throwError({
        errorMessage: message,
        statusCode: 400
      }))
    }
    return next()
  }
}

module.exports = {
  validationHandler
}
