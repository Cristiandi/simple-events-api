const { DataBase } = require('../../plugins/database')
const { firebaseAdminPlugin } = require('../../plugins/firebase-admin')
const { firebasePlugin } = require('../../plugins/firebase')
const { throwError } = require('../../utils')

class UserService {
  constructor () {
    this.dataBase = new DataBase()
    this.firebaseAdminPlugin = firebaseAdminPlugin
    this.firebasePlugin = firebasePlugin
  }

  async create ({ user = {} }) {
    const created = await this.dataBase.createOne({
      tableName: 'users',
      objectToCreate: {
        ...user
      }
    })

    return created
  }

  async getAll ({ limit, skip }) {
    const items = await this.dataBase.getAll({
      tableName: 'users',
      attributes: {}
    })

    return items
  }

  async getOne ({ attributes = {} }) {
    const user = await this.dataBase.getOne({
      tableName: 'users',
      attributes
    })

    return user
  }

  async update ({ id, user = {} }) {
    const updated = await this.dataBase.updateOne({
      tableName: 'users',
      id,
      objectToUpdate: {
        ...user
      }
    })

    return updated
  }

  async delete ({ id }) {
    const deleted = await this.dataBase.deleteOne({
      tableName: 'users',
      id
    })

    return deleted
  }

  async register ({ user }) {
    const userInFirebase = await this.firebaseAdminPlugin.createUser({
      email: user.email,
      password: user.password
    })

    // console.log('userInFirebase', userInFirebase)

    const userToSave = {
      ...user,
      authUid: userInFirebase.uid
    }
    delete userToSave.password

    const created = await this.create({
      user: {
        ...userToSave
      }
    })

    return created
  }

  async login ({ email, password }) {
    const userInFirebase = await this.firebasePlugin.login({
      email,
      password
    })

    const { uid, stsTokenManager: { accessToken } } = userInFirebase

    const user = await this.getOne({
      attributes: {
        authUid: uid
      }
    })

    return {
      ...user,
      accessToken
    }
  }

  async getUserByToken ({ token }) {
    let verificationResult
    try {
      verificationResult = await this.firebaseAdminPlugin.verifyToken({ token })
    } catch (error) {
      throw throwError({
        errorMessage: error.message,
        statusCode: 401
      })
    }

    const { uid } = verificationResult

    const user = await this.getOne({
      attributes: {
        authUid: uid
      }
    })

    if (!user) {
      throw throwError('can\'t get the user', 401)
    }

    return user
  }
}

module.exports = {
  UserService
}
