const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send(new Date())
})

router.use('/users', require('../modules/users/users.routes'))
router.use('/events', require('../modules/events/events.routes'))

module.exports = router
