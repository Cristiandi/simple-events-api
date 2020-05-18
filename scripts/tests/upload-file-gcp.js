const path = require('path')

require('../../environment')

const { GoogleCloudStoragePlugin } = require('../../plugins/google-cloud-storage')

const googleCloudStoragePlugin = new GoogleCloudStoragePlugin()

const filePath = path.resolve(__dirname, './cali.jpeg')

googleCloudStoragePlugin.uploadFile({
  bucketName: 'simple-events-dev-bucket',
  sourcePath: filePath,
  destinationPath: 'event-images/cali.jpeg',
  options: {
    public: true
  }
})
  .then(async res => {
    const { metadata: { name, bucket } } = res

    console.log('name', name)
    console.log('bucket', bucket)

    const result = await googleCloudStoragePlugin.makePublic({
      bucketName: bucket,
      filePath: name
    })

    const publicLink = `https://storage.googleapis.com/${result.bucket}/${result.object}`
    console.log('public link', publicLink)
  })
  .catch(err => console.error('error', err))
