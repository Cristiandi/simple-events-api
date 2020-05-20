const environment = require('./environment')

const app = require('./app')

const port = environment.APP_PORT

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('NODE JS app is running on port:', port, 'at', environment.NODE_ENV, 'environment.')
})
