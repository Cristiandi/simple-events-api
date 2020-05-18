const formidable = require('formidable')

const throwError = ({ errorMessage, statusCode = 500 }) => {
  const error = new Error(errorMessage)
  error.status = statusCode
  return error
}

const isEmptyObject = ({ obj }) => {
  return !Object.keys(obj).length
}

const getFormData = req => {
  return new Promise((resolve, reject) => {
    if (!req.headers['content-type']) {
      return reject(throwError({
        errorMessage: 'can\'t get the content-type header',
        statusCode: 400
      }))
    }

    const contentTypeHeader = req.headers['content-type'].split(';')[0]
    // console.log('contentTypeHeader', contentTypeHeader);

    if (!['multipart/form-data'].includes(contentTypeHeader)) {
      return reject(throwError({
        errorMessage: 'can\'t get the multipart/form-data in content-type header',
        statusCode: 400
      }))
    }

    const form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (Object.keys(req.body).length) return resolve(undefined)
      if (err) return reject(err)

      if (!Object.keys(fields).length && !Object.keys(files).length) return resolve(undefined)

      const fieldsToReturn = {}
      for (const key in fields) {
        fieldsToReturn[key] = fields[key]
      }

      const filesToReturn = {}
      for (const key in files) {
        filesToReturn[key] = files[key]
      }

      const response = {
        fields: fieldsToReturn,
        files: filesToReturn
      }
      return resolve(response)
    })
  })
}

module.exports = {
  throwError,
  isEmptyObject,
  getFormData
}
