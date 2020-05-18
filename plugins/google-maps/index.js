const axios = require('axios')

const environment = require('../../environment')

class GoogleMapsPlugin {
  constructor () {
    this.baseUrl = environment.GOOGLE_MAPS_BASE_URL
    this.apiKey = environment.GOOGLE_MAPS_API_KEY
  }

  async getGeoPointResultsByAddress ({ address }) {
    const response = await axios({
      method: 'get',
      url: `${this.baseUrl}geocode/json`,
      params: {
        address,
        key: this.apiKey
      }
    })

    const { data } = response
    // check
    if (!data) {
      throw new Error('can\'t get response.data.')
    }

    const { results } = data
    // check
    if (!results) {
      throw new Error('can\'t get data.results.')
    }
    if (!Array.isArray(results)) {
      throw new Error('data.results is not an array.')
    }

    return results
  }

  async getPredictions ({ input, latitude, longitude }) {
    const radius = environment.GOOGLE_MAPS_PLACE_AUTOCOMPLETE_RADIUS || 10000

    const response = await axios({
      method: 'get',
      url: `${this.baseUrl}place/autocomplete/json`,
      params: {
        input,
        location: `${latitude}, ${longitude}`,
        radius,
        strictbounds: true,
        key: this.apiKey
      }
    })

    const { data } = response
    // check
    if (!data) {
      throw new Error('can\'t get response.data.')
    }

    const { predictions } = data
    // check
    if (!predictions) {
      throw new Error('can\'t get data.predictions.')
    }
    if (!Array.isArray(predictions)) {
      throw new Error('data.predictions is not an array.')
    }

    return predictions
  }

  async getGeoPointByAddress ({ address }) {
    const results = await this.getGeoPointResultsByAddress({ address })
    // check
    if (results.length < 1) return []

    const geopoints = results.map(result => {
      return {
        formattedAddress: result.formatted_address,
        location: { ...result.geometry.location }
      }
    })

    return geopoints[0]
  }
}

module.exports = {
  GoogleMapsPlugin
}
