import assert from 'assert'
import nock from 'nock'
import supertest from 'supertest'
import { ERROR_CODES } from '../../server/constants/error-codes.constants.js'
import app from '../../server/index.js'
import { charlestonData } from './weather.mock-data.js'
let request = supertest(app)

describe('GET /weather', () => {
  nock('https://api.weatherbit.io/v2.0')
    .get(
      '/forecast/daily'
    )
    .query(true)
    .reply(200, charlestonData)
  it('should get Charleston Weather', done => {
    request
      .get(`/weather?zipCode=29412`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .then(response => {
        const results = JSON.parse(response.res.text)

        assert.equal(results.length, 5)
        assert.equal(results[0].date, '2021-04-14')
        assert.equal(results[0].temperature, 69.2)
        assert.equal(results[0].description, 'Scattered clouds')
        assert.equal(results[4].date, '2021-04-18')
        assert.equal(results[4].temperature, 64.3)
        assert.equal(results[4].description, 'Overcast clouds')
        done()
      })
      .catch(err => {
        console.error(err)
        done(err)
      })
  })
  it('should get deny an invalid zip code', done => {
    request
      .get(`/weather?zipCode=1`)
      .set('Content-Type', 'application/json')
      .expect(400)
      .then(response => {
        const result = JSON.parse(response.res.text)
        assert.equal(result.message, ERROR_CODES.INVALID_ZIP)
    
        done()
      })
      .catch(err => {
        console.error(err)
        done(err)
      })
  })
})
