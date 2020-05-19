const firebaseAdmin = require('firebase-admin')

const serviceAccount = require('./serviceAccountKey.js')

class FirebaseAdminPlugin {
  constructor () {
    this.admin = firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(serviceAccount) })
  }

  /**
   *
   *
   * @param {{
   * email: string,
   * password: string,
   * phone: string
   * }} { email, password, phone = undefined }
   * @returns
   * @memberof FirebaseAdmin
   */
  async createUser ({ email, password, phone = undefined }) {
    const objectToCreate = {
      email,
      password,
      phoneNumber: phone ? `+57${phone}` : undefined
    }

    let userRecord = await this.admin.auth().createUser(objectToCreate)
    userRecord = userRecord.toJSON()

    return userRecord
  }

  /**
   * function to verify the token
   *
   * @param {string} token
   * @returns {Promise<{
   * aud: string,
   * auth_time: number,
   * exp: number,
   * firebase: object,
   * iat: number,
   * iss: string,
   * sub: string,
   * uid: string
   * }>}
   * @memberof FirebaseAdminService
   */
  async verifyToken ({ token }) {
    const userFirebase = await this.admin.auth().verifyIdToken(token)

    return userFirebase
  }

  /**
   * function to the a user by uid (authUid)
   *
   * @param {{ uid: string }} { uid }
   * @returns
   * @memberof FirebaseAdminService
   */
  async getUserByUid ({ uid }) {
    let firebaseUser
    try {
      firebaseUser = await this.admin.auth().getUser(uid)
    } catch (error) {
      return undefined
    }

    return firebaseUser.toJSON()
  }

  /**
   * function to update an user in firebase
   *
   * @param {{ uid: string, attributes: { password: string, email: string } }} { uid, attributes }
   * @returns {Promise<object>} firebase updated used
   * @memberof FirebaseAdminService
   */
  async updateUser ({ uid, attributes }) {
    // Actualizo el usuario
    const firebaseUpdatedUser = await this.admin.auth().updateUser(uid, attributes)

    return firebaseUpdatedUser.toJSON()
  }

  /**
   * function to delete the firebase app
   *
   * @memberof FirebaseAdmin
   */
  async deleteApp () {
    await this.admin.delete()
  }
}

const firebaseAdminPlugin = new FirebaseAdminPlugin()

module.exports = {
  firebaseAdminPlugin
}
