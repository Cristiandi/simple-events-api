const express = require('express')
const router = express.Router()

const { validationHandler } = require('../../middlewares/validation.middlware')

const { schema: registerSchema } = require('./schemas/register')

const { userController } = require('./users.controller')

router.post(
  '/',
  validationHandler({ schema: registerSchema.body, check: 'body' }),
  userController.register
)

module.exports = router
