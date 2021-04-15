import axios from 'axios'

const BASE_WEATHER_URL = 'https://api.weatherbit.io/v2.0'
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY

export const F_UNIT = 'I'
export const M_UNIT = 'M'

export const fetchWeatherZipCode = async (zipCode, unit = F_UNIT) => {
  console.log(`${BASE_WEATHER_URL}/forecast/daily?postal_code=${zipCode}&units=${unit}&key=${WEATHERBIT_API_KEY}`)
  const response = await axios({
    url: `${BASE_WEATHER_URL}/forecast/daily?postal_code=${zipCode}&units=${unit}&key=${WEATHERBIT_API_KEY}`,
    method: 'GET'
  })
  return response.data
}
