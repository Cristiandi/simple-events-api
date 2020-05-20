const { EventService } = require('./events.service')

class EventController {
  /**
   *
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @memberof VisitanteController
   */
  async create (req, res, next) {
    try {
      const service = new EventService()

      const { body, user: { id: userId } } = req

      const created = await service.create({
        event: {
          ...body,
          userId
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
  async getAll (req, res, next) {
    try {
      const { query: { limit = 10, skip = 0 } } = req

      const service = new EventService()

      const result = await service.getAll({ limit: Number(limit), skip: Number(skip) })

      return res.status(200).json(result)
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
  async update (req, res, next) {
    try {
      const { params: { id }, body, user } = req

      const service = new EventService()

      const result = await service.askForUpdate({
        id,
        event: {
          ...body
        },
        userThatAsk: user
      })

      return res.status(200).json(result)
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
  async delete (req, res, next) {
    try {
      const { params: { id }, user } = req

      const service = new EventService()

      const result = await service.askForDelete({
        id,
        userThatAsk: user
      })

      return res.status(200).json(result)
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
  async getPlacePredictions (req, res, next) {
    try {
      const { query: { input, lat, long } } = req

      const service = new EventService()

      const result = await service.getPlacePredictions({
        input,
        lat,
        long
      })

      return res.status(200).json(result)
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
  async getGeoPoint (req, res, next) {
    try {
      const { query: { place } } = req

      const service = new EventService()

      const result = await service.getGeoPoint({
        place
      })

      return res.status(200).json(result)
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
  async uploadImage (req, res, next) {
    try {
      const { params: { id }, user } = req

      const service = new EventService()

      const result = await service.uploadImage({
        id,
        req,
        userThatAsk: user
      })

      return res.status(200).json(result)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = {
  eventController: new EventController()
}
