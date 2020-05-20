const app = require('./app')
const supertest = require('supertest')
const request = supertest(app)

describe('root tests', () => {
  it('Gets the root endpoint', async done => {
    const response = await request.get('/')

    expect(response.status).toBe(200)
    expect(typeof response.body).toBe('string')
    done()
  })
})
