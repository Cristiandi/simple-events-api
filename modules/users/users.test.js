const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)

describe('users module tests', () => {
  describe('POST /users', () => {
    it('respond 400 status', async done => {
      const response = await request.post('/users')
        .send({})

      expect(response.status).toBe(400)
      done()
    })
  })

  describe('POST /users/login', () => {
    it('respond 400 status', async done => {
      const response = await request.post('/users/login')
        .send({})

      expect(response.status).toBe(400)
      done()
    })

    it('respond 401 status', async done => {
      const response = await request.post('/users/login')
        .send({
          email: 'bad_email@dev.com',
          password: '2123131qw'
        })

      expect(response.status).toBe(401)
      done()
    })
  })
})
