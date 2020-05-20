const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const errorHandler = require('strong-error-handler')

// const environment = require('./environment')

const app = express()

const corsOptions = {
  exposedHeaders: ['X-Total-Count', 'Content-Disposition'],
  origin: true,
  credentials: true,
  maxAge: 86400
}

// using to handle the cors policy
app.use(cors(corsOptions))

// using to get the requested endpoints
app.use(morgan('dev'))

// using to parse the body object in request
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }))
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }))

// TODO: problem when try to ger files from request
// app.use(bodyParser.raw({ verify: rawBodySaver, type: () => true }))

app.use(require('./routes'))

// using to handle the error an return it in json format
app.use(errorHandler({
  debug: ['local', 'development', 'staging', 'production'].includes(app.get('env')),
  log: ['local', 'development', 'staging', 'production'].includes(app.get('env'))
}))

module.exports = app
