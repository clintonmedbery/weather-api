import express from 'express'
import { getWeatherByZipCode } from './controllers/weather.controller.js'
import './loadEnv.js'
import cors from 'cors'
import { zipCodeValidation } from './middleware/validation/input.validation.js'
const app = express()

const port = process.env.PORT || 4000

app.use(cors())
app.get('/canary', (req, res) => {
  res.send('alive')
})

app.get('/weather', zipCodeValidation, getWeatherByZipCode)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

export default app
