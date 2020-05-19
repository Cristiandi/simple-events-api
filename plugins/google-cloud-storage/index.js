// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage')

const serviceAccount = require('./serviceAccountKey.js')

class GoogleCloudStoragePlugin {
  constructor () {
    this.storage = new Storage({ credentials: { ...serviceAccount } })
  }

  async uploadFile ({ bucketName, sourcePath, destinationPath, options = {} }) {
    let optionsToUpload = {}

    if (destinationPath) {
      optionsToUpload = {
        ...optionsToUpload,
        destination: destinationPath
      }
    }

    optionsToUpload = {
      ...optionsToUpload,
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        // cacheControl: 'public, max-age=31536000',
        cacheControl: 'no-cache'
      },
      options
    }

    const [result] = await this.storage
      .bucket(bucketName)
      .upload(sourcePath, optionsToUpload)

    return result
  }

  async makePublic ({ bucketName, filePath }) {
    const [result] = await this.storage.bucket(bucketName).file(filePath).makePublic()

    return result
  }
}

module.exports = {
  GoogleCloudStoragePlugin
}
