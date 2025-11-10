import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (query) => {
    setLoading(true)
    setError(null)
    setWeather(null)

    // Read API key and guard early if missing to avoid making a request with appid=undefined
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    if (!apiKey) {
      console.error('VITE_WEATHER_API_KEY is not defined in import.meta.env')
      setError('Missing OpenWeatherMap API key. Add VITE_WEATHER_API_KEY to your .env and restart the dev server.')
      setLoading(false)
      return
    }

    try {
  const isZip = /^\d{5}(?:[-\s]\d{4})?$/.test(query)
  // Request imperial units so temperatures are returned in Fahrenheit
  const url = `https://api.openweathermap.org/data/2.5/weather?${isZip ? `zip=${query}` : `q=${encodeURIComponent(query)}`}&appid=${apiKey}&units=imperial`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Location not found')
      const data = await res.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weather={weather} loading={loading} error={error} />
    </>
  )
}

export default App
