const environment = require('../../environment')

const { DataBase } = require('../../plugins/database')
const { firebaseAdminPlugin } = require('../../plugins/firebase-admin')
const { GoogleMapsPlugin } = require('../../plugins/google-maps')
const { GoogleCloudStoragePlugin } = require('../../plugins/google-cloud-storage')

const { throwError, getFormData } = require('../../utils')

class EventService {
  constructor () {
    this.dataBase = new DataBase()
    this.firebaseAdminPlugin = firebaseAdminPlugin
    this.googleMapsPlugin = new GoogleMapsPlugin()
    this.googleCloudStoragePlugin = new GoogleCloudStoragePlugin()
  }

  async create ({ event = {} }) {
    const created = await this.dataBase.createOne({
      tableName: 'events',
      objectToCreate: {
        ...event
      }
    })

    return created
  }

  async getAll ({ limit, skip }) {
    const items = await this.dataBase.getAll({
      tableName: 'events',
      attributes: {}
    })

    let i = items.length
    let k = 0

    const newItems = []
    while (i--) {
      newItems[k] = items[i]
      k += 1
    }

    console.log(skip, limit + skip - 1)

    return newItems.slice(skip, limit + skip)
  }

  async getOne ({ attributes = {} }) {
    const event = await this.dataBase.getOne({
      tableName: 'events',
      attributes
    })

    return event
  }

  async update ({ id, event = {} }) {
    const updated = await this.dataBase.updateOne({
      tableName: 'events',
      id,
      objectToUpdate: {
        ...event
      }
    })

    return updated
  }

  async delete ({ id }) {
    const deleted = await this.dataBase.deleteOne({
      tableName: 'events',
      id
    })

    return deleted
  }

  async askForUpdate ({ id, event = {}, userThatAsk = {} }) {
    const currentEvent = await this.getOne({
      attributes: {
        id
      }
    })

    if (!currentEvent) {
      throw throwError({
        errorMessage: `can't the event with ${id}.`,
        statusCode: 404
      })
    }

    if (currentEvent.userId !== userThatAsk.id) {
      throw throwError({
        errorMessage: 'your user does not have permission to update this event.',
        statusCode: 403
      })
    }

    const updated = this.update({
      id,
      event
    })

    return updated
  }

  async getPlacePredictions ({ input, lat = undefined, long = undefined }) {
    const latitude = lat || '3.431860'
    const longitude = long || '-76.508051'

    const result = await this.googleMapsPlugin.getPredictions({ input, latitude, longitude })

    const newResult = result.map(item => ({
      id: item.id,
      place_id: item.place_id,
      description: item.description,
      reference: item.reference
    }))

    return newResult
  }

  async getGeoPoint ({ place }) {
    const result = await this.googleMapsPlugin.getGeoPointByAddress({
      address: place
    })

    return result
  }

  async uploadImage ({ id, req, userThatAsk = {} }) {
    const currentEvent = await this.getOne({
      attributes: {
        id
      }
    })

    if (!currentEvent) {
      throw throwError({
        errorMessage: `can't the event with ${id}.`,
        statusCode: 404
      })
    }

    if (currentEvent.userId !== userThatAsk.id) {
      throw throwError({
        errorMessage: 'your user does not have permission to update this event.',
        statusCode: 403
      })
    }

    const formData = await getFormData(req)

    if (!Object.keys(formData.files).length) {
      throw throwError({
        errorMessage: 'no image detected in the request.',
        statusCode: 400
      })
    }

    const file = formData.files[Object.keys(formData.files)[0]]

    const { name, type, path } = file

    if (!type.startsWith('image')) {
      throw throwError({
        errorMessage: 'the file is not an image.',
        statusCode: 400
      })
    }

    const uploadFileResult = await this.googleCloudStoragePlugin.uploadFile({
      bucketName: environment.GCP_BUCKET_NAME,
      destinationPath: `event-images/${name}`,
      sourcePath: path
    })

    const { metadata: { name: nameInGCP } } = uploadFileResult

    const makePublicResult = await this.googleCloudStoragePlugin.makePublic({
      bucketName: environment.GCP_BUCKET_NAME,
      filePath: nameInGCP
    })

    const publicLink = `https://storage.googleapis.com/${makePublicResult.bucket}/${makePublicResult.object}`

    console.log('publicLink', publicLink)

    const updated = await this.update({
      id: currentEvent.id,
      event: {
        imageUrl: publicLink
      }
    })

    return updated
  }
}

module.exports = {
  EventService
}
