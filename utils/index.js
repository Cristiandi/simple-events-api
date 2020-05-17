const returnError = ({ errorMessage, statusCode = 500 }) => {
  const error = new Error(errorMessage)
  error.status = statusCode
  return error
}

const isEmptyObject = ({ obj }) => {
  return !Object.keys(obj).length
}

module.exports = {
  returnError,
  isEmptyObject
}
