const up = knex => {
  return knex.schema.hasTable('events').then(exists => {
    if (!exists) {
      return knex.schema.createTable('events', table => {
        table.increments('id')
        table.string('title', 160).notNullable()
        table.string('description', 200)
        table.string('long', 20).notNullable()
        table.string('lat', 20).notNullable()
        table.string('imageUrl', 200)
        table.integer('userId').unsigned().notNullable()

        table.foreign('userId').references('users.id').onDelete('NO ACTION').onUpdate('NO ACTION')
      })
    }
  })
}

const down = knex => {
  return knex.schema.dropTable('events')
}

module.exports = {
  up,
  down
}
