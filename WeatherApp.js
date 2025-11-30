import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const apiKey = "28c24b8cd6875367366961a624d7a18b";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch {
      setWeather(null);
      setError("City not found");
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          className="search-input"
          placeholder="Enter city"
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

