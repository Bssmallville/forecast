import './WeatherDisplay.css'

function WeatherDisplay({ weather, loading, error }) {
  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!weather) return null

  return (
    <div className='weather-display'>
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>
        <strong>{weather.weather[0].main}</strong> - {weather.weather[0].description}
      </p>
      <p>
        Temperature: {Math.round(weather.main.temp)}°F<br />
        Feels like: {Math.round(weather.main.feels_like)}°F
      </p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} mph</p>
    </div>
  )
}

export default WeatherDisplay