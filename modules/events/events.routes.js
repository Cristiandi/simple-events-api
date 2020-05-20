const express = require('express')
const router = express.Router()

const { validationHandler } = require('../../middlewares/validation.middleware')
const { authHandler } = require('../../middlewares/auth.middleware')

const { schema: createSchema } = require('./schemas/create')
const { schema: getAllSchema } = require('./schemas/get-all')
const { schema: updateSchema } = require('./schemas/update')
const { schema: deleteSchema } = require('./schemas/update')
const { schema: getPlacePredictionsSchema } = require('./schemas/get-place-predictions')
const { schema: getGeoPointSchema } = require('./schemas/get-geo-point')
const { schema: uploadImageSchema } = require('./schemas/upload-image')

const { eventController } = require('./events.controller')

router.post(
  '/',
  validationHandler({ schema: createSchema.body, check: 'body' }),
  authHandler,
  eventController.create
)

router.get(
  '/',
  validationHandler({ schema: getAllSchema.query, check: 'query' }),
  authHandler,
  eventController.getAll
)

router.patch(
  '/:id',
  validationHandler({ schema: updateSchema.params, check: 'params' }),
  validationHandler({ schema: updateSchema.body, check: 'body' }),
  authHandler,
  eventController.update
)

router.delete(
  '/:id',
  validationHandler({ schema: deleteSchema.params, check: 'params' }),
  authHandler,
  eventController.delete
)

router.get(
  '/place-predictions',
  validationHandler({ schema: getPlacePredictionsSchema.query, check: 'query' }),
  authHandler,
  eventController.getPlacePredictions
)

router.get(
  '/geo-point',
  validationHandler({ schema: getGeoPointSchema.query, check: 'query' }),
  authHandler,
  eventController.getGeoPoint
)

router.patch(
  '/image/:id',
  validationHandler({ schema: uploadImageSchema.params, check: 'params' }),
  authHandler,
  eventController.uploadImage
)

module.exports = router
