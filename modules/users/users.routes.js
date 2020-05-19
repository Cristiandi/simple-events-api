const express = require('express')
const router = express.Router()

const { validationHandler } = require('../../middlewares/validation.middleware')

const { schema: registerSchema } = require('./schemas/register')
const { schema: loginSchema } = require('./schemas/login')

const { userController } = require('./users.controller')

router.post(
  '/',
  validationHandler({ schema: registerSchema.body, check: 'body' }),
  userController.register
)

router.post(
  '/login',
  validationHandler({ schema: loginSchema.body, check: 'body' }),
  userController.login
)

module.exports = router
