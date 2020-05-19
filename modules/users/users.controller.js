const { UserService } = require('./user.service')

class UserController {
  /**
   *
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @memberof VisitanteController
   */
  async register (req, res, next) {
    try {
      const service = new UserService()

      const { body } = req

      const created = await service.register({
        user: {
          ...body
        }
      })

      return res.status(201).json(created)
    } catch (error) {
      return next(error)
    }
  }

  /**
   *
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @memberof VisitanteController
   */
  async login (req, res, next) {
    try {
      const service = new UserService()

      const { body } = req

      const result = await service.login({
        email: body.email,
        password: body.password
      })

      return res.status(200).json(result)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = {
  userController: new UserController()
}
