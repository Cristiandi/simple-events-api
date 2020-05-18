const environment = require('../../environment')

const { throwError, isEmptyObject } = require('../../utils')

class DataBase {
  constructor () {
    const config = {
      client: environment.DB_CLIENT,
      connection: {
        host: environment.DB_HOST,
        user: environment.DB_USER,
        password: environment.DB_PASSWORD,
        database: environment.DB_NAME,
        port: environment.DB_PORT
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }

    this.knex = require('knex')(config)
  }

  async createOne ({ objectToCreate = {}, tableName, trx }) {
    const db = trx || this.knex

    const [id] = await db(tableName)
      .returning('id')
      .insert(objectToCreate)

    const created = await this.getOne({
      tableName,
      attributes: {
        id
      }
    })

    return created
  }

  async getOne ({ attributes = {}, tableName, trx }) {
    const db = trx || this.knex

    const query = db.select('*')
      .from(tableName)
      .where(attributes)
      .orderBy('id', 'desc')
      .limit(1)

    const data = await query

    if (!data.length) return null

    return data[0]
  }

  async getAll ({ attributes = {}, tableName, trx }) {
    const db = trx || this.knex

    const query = db.select('*')
      .from(tableName)
      .where(attributes)
      .orderBy('id', 'desc')

    const data = await query

    if (!data.length) return null

    return data
  }

  async updateOne ({ id, objectToUpdate, tableName, trx }) {
    const db = trx || this.knex

    const existing = await this.getOne({
      attributes: {
        id
      },
      tableName,
      trx
    })

    if (!existing) {
      throw throwError({
        errorMessage: `can't get the ${tableName} with id ${id}.`,
        statusCode: 404
      })
    }

    if (isEmptyObject({ obj: objectToUpdate })) return existing

    await db(tableName)
      .update(objectToUpdate)
      .where({ id })

    const updated = await this.getOne({
      attributes: {
        id
      },
      tableName,
      trx
    })

    return updated
  }

  async deleteOne ({ id, tableName, trx }) {
    const db = trx || this.knex

    const existing = await this.getOne({
      attributes: {
        id
      },
      tableName,
      trx
    })

    if (!existing) {
      throw throwError({
        errorMessage: `can't get the ${tableName} with id ${id}.`,
        statusCode: 404
      })
    }

    await db(tableName)
      .where({ id })
      .delete()

    return { ...existing, id: undefined }
  }
}

module.exports = {
  DataBase
}
