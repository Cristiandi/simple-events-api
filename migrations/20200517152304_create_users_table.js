const up = knex => {
  return knex.schema.hasTable('users').then(exists => {
    if (!exists) {
      return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('username', 200).notNullable()
        table.string('email', 100).notNullable()
        table.string('authUid', 100)

        table.unique('email')
      })
    }
  })
}

const down = knex => {
  return knex.schema.dropTable('users')
}

module.exports = {
  up,
  down
}
