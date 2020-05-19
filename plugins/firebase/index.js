const firebase = require('firebase')

const firebaseConfig = require('./firebaseConfig')
const { throwError } = require('../../utils')

class FirebasePlugin {
  /**
   * Creates an instance of FirebaseService.
   * @memberof FirebaseService
   */
  constructor () {
    firebase.initializeApp(firebaseConfig)

    this.app = firebase.app()
  }

  /**
   * funciton to login a user
   *
   * @param {{ email: string, password }} { email, password }
   * @returns
   * @memberof FirebaseService
   */
  async login ({ email, password }) {
    let result
    try {
      result = await this.app.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      const code = error.code
      if (code && code.startsWith('auth')) {
        throw throwError({
          errorMessage: 'email or password are wrong.',
          statusCode: 401
        })
      }
      throw error
    }

    return result.user.toJSON()
  }
}

const firebasePlugin = new FirebasePlugin()

module.exports = {
  firebasePlugin
}
