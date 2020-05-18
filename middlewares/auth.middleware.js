const { throwError } = require('../utils')

const authHandler = async (req, res, next) => {
  const { headers } = req

  const { authorization: authHeader = '' } = headers

  const token = authHeader.split(' ')[1] || null

  if (token) {
    try {
      const { UserService } = require('../modules/users/user.service')
      const userService = new UserService()

      const user = await userService.getUserByToken({ token })

      req.user = user

      return next()
    } catch (error) {
      console.error(error)
      return next(throwError({
        errorMessage: error.message,
        statusCode: 401
      }))
    }
  } else {
    return next(throwError({
      errorMessage: 'missing authorization header.',
      statusCode: 401
    }))
  }
}

module.exports = {
  authHandler
}
