import { fetchWeatherZipCode } from '../services/weather.service.js'

export const getWeatherByZipCode = async (req, res, next) => {
  const zip = req.query.zipCode
  const response = await fetchWeatherZipCode(zip)
  if (!response.data) {
    res.status(200).json({ data: [] })
  }
  const weatherData = response.data
    .map(weatherItem => {
      return {
        date: weatherItem.datetime,
        temperature: weatherItem.temp,
        description: weatherItem.weather.description,
        iconName: weatherItem.weather.icon
      }
    })
    .splice(0, 5)
  const weather = {
    cityName: response.city_name,
    data: weatherData
  }
  res.status(200).json(weather)
}
