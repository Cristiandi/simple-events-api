// Update with your config settings.
const path = require('path')

const environment = require('./environment')

const dbPath = path.resolve(__dirname, './db.sqlite')

module.exports = {

  local: {
    client: environment.DB_CLIENT,
    connection: {
      filename: dbPath
    },
    useNullAsDefault: true
  },

  development: {
    client: environment.DB_CLIENT,
    connection: {
      filename: dbPath
    },
    useNullAsDefault: true
  }
}
